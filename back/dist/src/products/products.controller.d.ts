import { ProductsService } from './products.service';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    getByCategory(category: Category): Promise<Product[]>;
    create(dto: CreateProductDto): Promise<Product>;
    update(id: string, dto: UpdateProductDto): Promise<Product>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
