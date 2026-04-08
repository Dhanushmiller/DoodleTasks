import { OrdersService } from './orders.service';
import { Response as ExpressResponse } from 'express';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, createOrderDto: any): Promise<{
        message: string;
        data: import("./schemas/order.schema").OrderDocument;
    }>;
    updateStatus(id: string, status: string): Promise<{
        message: string;
        data: import("./schemas/order.schema").OrderDocument;
    }>;
    getReport(startDate: string, endDate: string, sortBy: string, res: ExpressResponse): Promise<ExpressResponse<any, Record<string, any>>>;
}
