import { Injectable, BadRequestException } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepo.findById(id);
  }

  async getProductsByCategory(category: Category): Promise<Product[]> {
    return this.productRepo.findByCategory(category);
  }

  async createProduct(dto: CreateProductDto): Promise<Product> {
    return this.productRepo.createProduct(dto);
  }

  async updateProduct(id: string, dto: UpdateProductDto): Promise<Product> {
    return this.productRepo.updateProduct(id, dto);
  }

  async deleteProduct(id: string): Promise<string> {
    return this.productRepo.deleteProduct(id);
  }
}