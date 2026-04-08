import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  googleId?: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  wishlist: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
