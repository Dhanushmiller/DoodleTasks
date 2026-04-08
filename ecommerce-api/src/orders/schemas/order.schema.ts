import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order {
  _id: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop([
    {
      productId: { type: Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ])
  items: {
    productId: Types.ObjectId;
    quantity: number;
    price: number;
  }[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ default: 'pending' })
  status: string;

  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
