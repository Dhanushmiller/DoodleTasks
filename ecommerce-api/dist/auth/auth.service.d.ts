import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(registerDto: any): Promise<import("../users/schemas/user.schema").UserDocument>;
    validateGoogleUser(profile: any): Promise<import("../users/schemas/user.schema").UserDocument>;
}
