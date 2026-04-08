import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userData: any): Promise<UserDocument> {
    const newUser = new this.userModel(userData);
    return newUser.save();
  }

  async findOneByEmail(email: string): Promise<UserDocument | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async findOneById(id: string): Promise<UserDocument | undefined> {
    return this.userModel.findById(id).exec();
  }

  async addToWishlist(userId: string, productId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { wishlist: new Types.ObjectId(productId) } },
      { new: true }
    ).exec();
  }
}
