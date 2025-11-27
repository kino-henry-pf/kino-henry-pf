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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_entity_1 = __importDefault(require("./product.entity"));
const typeorm_2 = require("@nestjs/typeorm");
let ProductsRepository = class ProductsRepository {
    productRepository;
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async findAll() {
        return await this.productRepository.find({
            order: { name: 'ASC' },
        });
    }
    async findById(id) {
        const product = await this.productRepository.findOneBy({ id });
        if (!product)
            throw new common_1.BadRequestException(`Producto con id ${id} no encontrado`);
        return product;
    }
    async findByCategory(category) {
        const products = await this.productRepository.find({
            where: { category },
        });
        if (!products.length) {
            throw new common_1.BadRequestException(`No hay productos disponibles en la categoría ${category}`);
        }
        return products;
    }
    async createProduct(product) {
        const newProduct = this.productRepository.create({
            name: product.name,
            image: product.image,
            description: product.description,
            price: product.price,
            category: product.category,
        });
        return await this.productRepository.save(newProduct);
    }
    async updateProduct(id, product) {
        const findProduct = await this.productRepository.findOneBy({ id });
        if (!findProduct)
            throw new common_1.BadRequestException(`Producto con id ${id} no existe`);
        await this.productRepository.update(id, product);
        const findUpdatedProduct = await this.productRepository.findOneBy({ id });
        if (!findUpdatedProduct)
            throw new common_1.BadRequestException(`Producto con id ${id} no existe`);
        return findUpdatedProduct;
    }
    async deleteProduct(id) {
        const findProduct = await this.productRepository.findOneBy({ id });
        if (!findProduct)
            throw new common_1.BadRequestException(`Producto con id ${id} no existe`);
        await this.productRepository.delete({ id });
        return `Producto con id ${id} ha sido eliminado`;
    }
};
exports.ProductsRepository = ProductsRepository;
exports.ProductsRepository = ProductsRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(product_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductsRepository);
//# sourceMappingURL=product.repository.js.map