import { Category } from "../product.entity";
export default class CreateProductDto {
    name: string;
    image: string;
    description: string;
    price: number;
    category: Category;
}
