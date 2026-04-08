import { Controller, Post, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('wishlist/:productId')
  @UseGuards(JwtAuthGuard)
  addToWishlist(@Req() req, @Param('productId') productId: string) {
    return this.usersService.addToWishlist(req.user.userId, productId);
  }
}
