"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./product.repository");
const cloudinary_service_1 = __importDefault(require("../cloudinary/cloudinary.service"));
let ProductsService = class ProductsService {
    productRepo;
    cloudinaryService;
    constructor(productRepo, cloudinaryService) {
        this.productRepo = productRepo;
        this.cloudinaryService = cloudinaryService;
    }
    async getAllProducts() {
        return this.productRepo.findAll();
    }
    async getProductById(id) {
        return this.productRepo.findById(id);
    }
    async getProductsByCategory(category) {
        return this.productRepo.findByCategory(category);
    }
    async createProduct(dto, file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('Image file is required');
            }
            const imageUrl = await this.cloudinaryService.uploadImage(file, 'kino/products');
            return await this.productRepo.createProduct({
                ...dto,
                image: imageUrl,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating new product: ' + error);
        }
    }
    async updateProduct(id, dto, file) {
        try {
            const product = await this.productRepo.findById(id);
            if (!product) {
                throw new common_1.NotFoundException(`No product with id ${id} has been found`);
            }
            let imageUrl = product.image;
            if (file) {
                imageUrl = await this.cloudinaryService.uploadImage(file, 'kino/products');
            }
            const updated = await this.productRepo.updateProduct(id, {
                ...dto,
                image: imageUrl,
            });
            return updated;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error updating product: ' + error);
        }
    }
    async deleteProduct(id) {
        return this.productRepo.deleteProduct(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductsRepository,
        cloudinary_service_1.default])
], ProductsService);
//# sourceMappingURL=products.service.js.map