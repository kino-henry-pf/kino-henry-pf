import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiExtraModels, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { Roles } from '../decorator/role.decorator';
import { AuthGuard } from '../auth/guards/auth-guard.guard';
import { RolesGuard } from '../auth/guards/role-guard.guard';

@ApiTags('products (Productos)')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @ApiOperation({ summary: 'Obtener Todos los productos registrados' })
  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.getAllProducts();
  }

  @ApiOperation({ summary: 'Obtener producto a traves de su UUID' })
  @Get(':id')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async getById(@Param('id') id: string): Promise<Product> {
    return this.productService.getProductById(id);
  }

  @ApiOperation({
    summary: 'Obtener Todos los productos de una misma categoria',
  })
  @Get('category/:category')
  async getByCategory(
    @Param('category') category: Category,
  ): Promise<Product[]> {
    return this.productService.getProductsByCategory(category);
  }

  @ApiOperation({ summary: 'Registrar un producto nuevo' })
  @ApiExtraModels(CreateProductDto)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(CreateProductDto) }, // 👉 hace que el DTO aparezca en Models
        {
          type: 'object',
          properties: {
            image: {
              type: 'string',
              format: 'binary',
              description: 'Product image',
            },
          },
          required: ['name', 'description', 'price', 'category', 'image'],
        },
      ],
    },
  })
  @Post()
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async create(
    @Body() dto: CreateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Product> {
    return await this.productService.createProduct(dto, file);
  }

  @ApiOperation({
    summary: 'Actualizar una o mas propiedades de un producto nuevo',
    description:
      'Debido al comportamiento de Swagger las actualizaciones no se realizan de la manera mas óptima, evitar realizarlas desde aca para no vulnerar la base de datos',
  })
  @ApiExtraModels(UpdateProductDto)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      allOf: [
        { $ref: getSchemaPath(UpdateProductDto) },
        {
          type: 'object',
          properties: {
            image: {
              type: 'string',
              format: 'binary',
              description: 'Imagen del producto (opcional)',
            },
          },
        },
      ],
    },
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Product> {
    return this.productService.updateProduct(id, dto, file);
  }

  @ApiOperation({ summary: 'Eliminar un producto a traves de su UUID' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    const message = await this.productService.deleteProduct(id);
    return { message };
  }
}
