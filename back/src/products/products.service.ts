import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './product.repository';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import CloudinaryService from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository,
              private readonly cloudinaryService: CloudinaryService
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepo.findAll();
  }

  async getProductById(id: string): Promise<Product> {
    return this.productRepo.findById(id);
  }

  async getProductsByCategory(category: Category): Promise<Product[]> {
    return this.productRepo.findByCategory(category);
  }

  async createProduct(dto: CreateProductDto, file?: Express.Multer.File): Promise<Product> {
    try {
          if (!file) {
            throw new BadRequestException('Image file is required');
          }
    
          const imageUrl = await this.cloudinaryService.uploadImage(
            file,
            'kino/products',
          );
    
          return await this.productRepo.createProduct({
            ...dto,
            image: imageUrl,
          } as CreateProductDto);
        } catch (error) {
          throw new BadRequestException('Error creating new product: ' + error);
        }
  }

  async updateProduct(id: string, dto: UpdateProductDto, file?: Express.Multer.File): Promise<Product> {
     try {
      const product = await this.productRepo.findById(id)
      if(!product) throw new NotFoundException(`No product with id ${id} has been found`)
      let imageUrl = dto.image;
      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(
          file,
          'kino/products',
        );
      }

      const updated = await this.productRepo.updateProduct(id, {
        ...dto,
        image: imageUrl || product.image,
      });

      return updated;
    } catch (error) {
      throw new BadRequestException('Error updating product: ' + error);
    }
  }

  async deleteProduct(id: string): Promise<string> {
    return this.productRepo.deleteProduct(id);
  }
}