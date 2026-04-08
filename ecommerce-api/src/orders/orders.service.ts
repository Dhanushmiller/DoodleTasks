import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ProductsService } from '../products/products.service';
import { createObjectCsvStringifier } from 'csv-writer';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private mailerService: MailerService,
    private productsService: ProductsService,
  ) {}

  async create(userId: string, createOrderDto: any, userEmail: string): Promise<OrderDocument> {
    // 1. Restriction: Max 5 products per day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const ordersToday = await this.orderModel.find({
      user: new Types.ObjectId(userId),
      createdAt: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalQuantityToday = ordersToday.reduce(
      (sum, order) => sum + order.items.reduce((iSum, item) => iSum + item.quantity, 0),
      0,
    );

    const newItemsQuantity = createOrderDto.items.reduce((sum, item) => sum + item.quantity, 0);

    if (totalQuantityToday + newItemsQuantity > 5) {
      throw new BadRequestException('Purchase limit exceeded: Max 5 products per day.');
    }

    // 2. Fetch prices, calculate total amount, and verify stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of createOrderDto.items) {
      const product = await this.productsService.findOne(item.productId);
      if (!product) {
        throw new BadRequestException(`Product not found: ${item.productId}`);
      }
      if (product.stock < item.quantity) {
        throw new BadRequestException(`Insufficient stock for product: ${product.name}`);
      }

      // Update item with price from database
      const itemPrice = product.price;
      orderItems.push({
        productId: new Types.ObjectId(item.productId),
        quantity: item.quantity,
        price: itemPrice,
      });

      totalAmount += itemPrice * item.quantity;

      // Reduce product stock
      await this.productsService.update(item.productId, {
        stock: product.stock - item.quantity,
      });
    }

    // 3. Create Order
    const createdOrder = new this.orderModel({
      user: new Types.ObjectId(userId),
      items: orderItems,
      totalAmount,
      status: 'pending',
    });
    const savedOrder = await createdOrder.save();

    // 4. Send Invoice Email
    try {
      await this.sendInvoice(userEmail, savedOrder);
    } catch (error) {
      console.error('Failed to send invoice email:', error.message);
      // We don't throw here to ensure the order creation is still considered successful
    }

    return savedOrder;
  }

  async sendInvoice(email: string, order: OrderDocument) {
    await this.mailerService.sendMail({
      to: email,
      subject: `Order Confirmation - #${order._id}`,
      template: './invoice', // In a real app, you'd use a template engine
      context: { order },
      html: `<h1>Order Confirmation</h1><p>Thank you for your purchase!</p><p>Total: $${order.totalAmount}</p><p>Status: ${order.status}</p>`,
    });
  }

  async updateStatus(orderId: string, status: string): Promise<OrderDocument> {
    return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true }).exec();
  }

  async generateCsvReport(startDate: Date, endDate: Date, sortBy: string) {
    const orders = await this.orderModel.find({
      createdAt: { $gte: startDate, $lte: endDate },
    })
    .populate('user', 'name email')
    .sort({ [sortBy]: 1 })
    .exec();

    const csvStringifier = createObjectCsvStringifier({
      header: [
        { id: 'orderId', title: 'Order ID' },
        { id: 'userName', title: 'User Name' },
        { id: 'userEmail', title: 'User Email' },
        { id: 'totalAmount', title: 'Total Amount' },
        { id: 'status', title: 'Status' },
        { id: 'createdAt', title: 'Date' },
      ],
    });

    const records = orders.map(order => ({
      orderId: order._id,
      userName: (order.user as any).name,
      userEmail: (order.user as any).email,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    }));

    return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
  }
}
