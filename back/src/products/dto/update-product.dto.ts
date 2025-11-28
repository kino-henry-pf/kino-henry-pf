import { PartialType } from '@nestjs/mapped-types';
import CreateProductDto from './create-product.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Category } from '../product.entity';
import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, MaxLength, ValidateIf } from 'class-validator';

export class UpdateProductDto {

    @ApiPropertyOptional({ example: 'Popcorn XL' })
    @IsString()
    @IsOptional()
    @MaxLength(200)
    name?: string;

    @ApiPropertyOptional({ example: 'Delicioso maíz recién hecho' })
    @IsString()
    @IsOptional()
    @MaxLength(200)
    description?: string;

    @ApiPropertyOptional({
  example: 9.99,
  nullable: true,
  default: undefined,
}) 
    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    price?: number;

    @ValidateIf((_, value) => value !== '')
    @ApiPropertyOptional({
        example: Category.POPCORN,
        enum: Category,
        nullable: true,
    })
    @IsEnum(Category)
    @IsOptional()
    category?: Category;

    @ApiPropertyOptional({
        type: 'string',
        format: 'binary',
        description: 'Imagen del producto (opcional)',
    })
    @IsOptional()
    image?: any;
}
