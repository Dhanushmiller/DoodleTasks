import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    addToWishlist(req: any, productId: string): Promise<import("./schemas/user.schema").UserDocument>;
}
