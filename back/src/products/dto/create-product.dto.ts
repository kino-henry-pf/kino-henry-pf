import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator"
import { Category } from "../product.entity"

export default class CreateProductDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string


    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description: string

    @IsNumber()
    @IsNotEmpty()
    price: number

    @IsEnum(Category)
    category: Category



}
