import { ProductsRepository } from './product.repository';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private readonly productRepo;
    constructor(productRepo: ProductsRepository);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Product[]>;
    createProduct(dto: CreateProductDto): Promise<Product>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<string>;
}
