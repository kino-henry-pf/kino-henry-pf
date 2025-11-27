import { ProductsRepository } from './product.repository';
import Product, { Category } from './product.entity';
import CreateProductDto from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import CloudinaryService from 'src/cloudinary/cloudinary.service';
export declare class ProductsService {
    private readonly productRepo;
    private readonly cloudinaryService;
    constructor(productRepo: ProductsRepository, cloudinaryService: CloudinaryService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Product[]>;
    createProduct(dto: CreateProductDto, file?: Express.Multer.File): Promise<Product>;
    updateProduct(id: string, dto: UpdateProductDto, file?: Express.Multer.File): Promise<Product>;
    deleteProduct(id: string): Promise<string>;
}
