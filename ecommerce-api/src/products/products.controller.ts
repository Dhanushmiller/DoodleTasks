import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
import { CreateProductSchema, UpdateProductSchema } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(CreateProductSchema))
  async create(@Body() createProductDto: any) {
    const data = await this.productsService.create(createProductDto);
    return { message: 'Product created successfully', data };
  }

  @Get()
  async findAll() {
    const data = await this.productsService.findAll();
    return { message: 'Products fetched successfully', data };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.productsService.findOne(id);
    return { message: 'Product details fetched successfully', data };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new JoiValidationPipe(UpdateProductSchema))
  async update(@Param('id') id: string, @Body() updateProductDto: any) {
    const data = await this.productsService.update(id, updateProductDto);
    return { message: 'Product updated successfully', data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return { message: 'Product deleted successfully', data: null };
  }
}
