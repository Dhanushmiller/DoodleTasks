import { Controller, Post, Body, Get, UseGuards, Req, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { RegisterSchema, LoginSchema } from './schemas/auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new JoiValidationPipe(RegisterSchema))
  async register(@Body() registerDto: any) {
    const data = await this.authService.register(registerDto);
    return { message: 'User registered successfully', data };
  }

  @Post('login')
  @UsePipes(new JoiValidationPipe(LoginSchema))
  async login(@Body() loginDto: any) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    const data = await this.authService.login(user);
    return { message: 'Login successful', data };
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.authService.login(req.user);
  }
}
