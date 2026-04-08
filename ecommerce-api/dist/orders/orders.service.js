"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const mailer_1 = require("@nestjs-modules/mailer");
const products_service_1 = require("../products/products.service");
const csv_writer_1 = require("csv-writer");
let OrdersService = class OrdersService {
    constructor(orderModel, mailerService, productsService) {
        this.orderModel = orderModel;
        this.mailerService = mailerService;
        this.productsService = productsService;
    }
    async create(userId, createOrderDto, userEmail) {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        const ordersToday = await this.orderModel.find({
            user: new mongoose_2.Types.ObjectId(userId),
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        const totalQuantityToday = ordersToday.reduce((sum, order) => sum + order.items.reduce((iSum, item) => iSum + item.quantity, 0), 0);
        const newItemsQuantity = createOrderDto.items.reduce((sum, item) => sum + item.quantity, 0);
        if (totalQuantityToday + newItemsQuantity > 5) {
            throw new common_1.BadRequestException('Purchase limit exceeded: Max 5 products per day.');
        }
        let totalAmount = 0;
        const orderItems = [];
        for (const item of createOrderDto.items) {
            const product = await this.productsService.findOne(item.productId);
            if (!product) {
                throw new common_1.BadRequestException(`Product not found: ${item.productId}`);
            }
            if (product.stock < item.quantity) {
                throw new common_1.BadRequestException(`Insufficient stock for product: ${product.name}`);
            }
            const itemPrice = product.price;
            orderItems.push({
                productId: new mongoose_2.Types.ObjectId(item.productId),
                quantity: item.quantity,
                price: itemPrice,
            });
            totalAmount += itemPrice * item.quantity;
            await this.productsService.update(item.productId, {
                stock: product.stock - item.quantity,
            });
        }
        const createdOrder = new this.orderModel({
            user: new mongoose_2.Types.ObjectId(userId),
            items: orderItems,
            totalAmount,
            status: 'pending',
        });
        const savedOrder = await createdOrder.save();
        try {
            await this.sendInvoice(userEmail, savedOrder);
        }
        catch (error) {
            console.error('Failed to send invoice email:', error.message);
        }
        return savedOrder;
    }
    async sendInvoice(email, order) {
        await this.mailerService.sendMail({
            to: email,
            subject: `Order Confirmation - #${order._id}`,
            template: './invoice',
            context: { order },
            html: `<h1>Order Confirmation</h1><p>Thank you for your purchase!</p><p>Total: $${order.totalAmount}</p><p>Status: ${order.status}</p>`,
        });
    }
    async updateStatus(orderId, status) {
        return this.orderModel.findByIdAndUpdate(orderId, { status }, { new: true }).exec();
    }
    async generateCsvReport(startDate, endDate, sortBy) {
        const orders = await this.orderModel.find({
            createdAt: { $gte: startDate, $lte: endDate },
        })
            .populate('user', 'name email')
            .sort({ [sortBy]: 1 })
            .exec();
        const csvStringifier = (0, csv_writer_1.createObjectCsvStringifier)({
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
            userName: order.user.name,
            userEmail: order.user.email,
            totalAmount: order.totalAmount,
            status: order.status,
            createdAt: order.createdAt,
        }));
        return csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(records);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mailer_1.MailerService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map