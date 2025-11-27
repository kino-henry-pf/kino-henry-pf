import { Category } from "../product.entity";
export default class CreateProductDto {
    name: string;
    description: string;
    price: number;
    category: Category;
}
