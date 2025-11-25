import { Repository } from "typeorm";
import Product, { Category } from "./product.entity";
import CreateProductDto from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
export declare class ProductsRepository {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product>;
    findByCategory(category: Category): Promise<Product[]>;
    createProduct(product: CreateProductDto): Promise<Product>;
    updateProduct(id: string, product: UpdateProductDto): Promise<Product>;
    deleteProduct(id: string): Promise<string>;
}
