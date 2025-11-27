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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const product_repository_1 = require("./product.repository");
let ProductsService = class ProductsService {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
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
    async createProduct(dto) {
        return this.productRepo.createProduct(dto);
    }
    async updateProduct(id, dto) {
        return this.productRepo.updateProduct(id, dto);
    }
    async deleteProduct(id) {
        return this.productRepo.deleteProduct(id);
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_repository_1.ProductsRepository])
], ProductsService);
//# sourceMappingURL=products.service.js.map