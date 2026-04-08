import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: any): Promise<{
        message: string;
        data: import("../users/schemas/user.schema").UserDocument;
    }>;
    login(loginDto: any): Promise<{
        message: string;
        data?: undefined;
    } | {
        message: string;
        data: {
            access_token: string;
            user: any;
        };
    }>;
    googleAuth(req: any): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        access_token: string;
        user: any;
    }>;
}
