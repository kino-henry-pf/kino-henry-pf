import { Controller, Get, Param, Post, Body, Put, Delete, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @Get('category/:category')
  async getByCategory(@Param('category') category: Category): Promise<Product[]> {
    return this.productService.getProductsByCategory(category);
  }

  @Post()
  async create(@Body() dto: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(dto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const message = await this.productService.deleteProduct(id);
    return { message };
  }
}
