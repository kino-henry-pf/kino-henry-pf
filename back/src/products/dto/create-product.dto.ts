import { IsEnum, IsNotEmpty, IsNumber, IsPositive, IsString, MaxLength } from "class-validator"
import { Category } from "../product.entity"
import { ApiProperty } from "@nestjs/swagger"

export default class CreateProductDto {

    @ApiProperty({
          example: 'Nachos con Queso',
          description: 'Nombre del producto',
        })
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string

    @ApiProperty({
          example: 'Nachos calientes con queso',
          description: 'descripción del producto',
        })
    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description: string

    @ApiProperty({
          example: 85.50,
          description: 'Precio del producto en numeros',
        })
    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price: number

    @ApiProperty({
          example: "nachos",
          enum: Category
        })
    @IsEnum(Category)
    category: Category



}
