import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { ProductsService } from '../products/products.service';
export declare class OrdersService {
    private orderModel;
    private mailerService;
    private productsService;
    constructor(orderModel: Model<OrderDocument>, mailerService: MailerService, productsService: ProductsService);
    create(userId: string, createOrderDto: any, userEmail: string): Promise<OrderDocument>;
    sendInvoice(email: string, order: OrderDocument): Promise<void>;
    updateStatus(orderId: string, status: string): Promise<OrderDocument>;
    generateCsvReport(startDate: Date, endDate: Date, sortBy: string): Promise<string>;
}
