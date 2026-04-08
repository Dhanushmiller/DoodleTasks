import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(userData: any): Promise<UserDocument>;
    findOneByEmail(email: string): Promise<UserDocument | undefined>;
    findOneById(id: string): Promise<UserDocument | undefined>;
    addToWishlist(userId: string, productId: string): Promise<UserDocument>;
}
