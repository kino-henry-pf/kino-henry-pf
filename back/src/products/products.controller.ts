import { Controller, Get, Param, Post, Body, Put, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

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
  @UseInterceptors(FileInterceptor('image', {storage: memoryStorage()}))
  async create(@Body() dto: CreateProductDto,
               @UploadedFile() file?: Express.Multer.File): Promise<Product> {
    return await this.productService.createProduct(dto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.updateProduct(id, dto, file);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const message = await this.productService.deleteProduct(id);
    return { message };
  }
}
