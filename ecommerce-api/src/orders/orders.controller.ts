import { Controller, Get, Post, Body, Put, Param, Query, UseGuards, Req, Res, BadRequestException, UsePipes } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response as ExpressResponse } from 'express';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { CreateOrderSchema } from './schemas/order.joi';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(CreateOrderSchema))
  async create(@Req() req, @Body() createOrderDto: any) {
    const data = await this.ordersService.create(req.user.userId, createOrderDto, req.user.email);
    return { message: 'Order placed successfully', data };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id') id: string, @Body('status') status: string) {
    const data = await this.ordersService.updateStatus(id, status);
    return { message: 'Order status updated successfully', data };
  }

  @Get('report')
  @UseGuards(JwtAuthGuard)
  async getReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('sortBy') sortBy: string = 'createdAt',
    @Res() res: ExpressResponse,
  ) {
    if (!startDate || !endDate) {
      throw new BadRequestException('startDate and endDate are required');
    }
    const csvData = await this.ordersService.generateCsvReport(new Date(startDate), new Date(endDate), sortBy);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=orders-report.csv');
    return res.status(200).send(csvData);
  }
}
