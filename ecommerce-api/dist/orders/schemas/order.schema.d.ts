import { Document, Types } from 'mongoose';
export type OrderDocument = Order & Document;
export declare class Order {
    _id: string;
    user: Types.ObjectId;
    items: {
        productId: Types.ObjectId;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    status: string;
    createdAt: Date;
}
export declare const OrderSchema: import("mongoose").Schema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order, any, {}> & Order & Required<{
    _id: string;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>, {}, import("mongoose").DefaultSchemaOptions> & import("mongoose").FlatRecord<Order> & Required<{
    _id: string;
}> & {
    __v: number;
}>;
