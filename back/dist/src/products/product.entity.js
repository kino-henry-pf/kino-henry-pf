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
exports.Category = void 0;
const typeorm_1 = require("typeorm");
var Category;
(function (Category) {
    Category["POPCORN"] = "popcorn";
    Category["SOFT_DRINK"] = "soft_drink";
    Category["WATER"] = "water";
    Category["JUICE"] = "juice";
    Category["CANDY"] = "candy";
    Category["CHOCOLATE"] = "chocolate";
    Category["GUM"] = "gum";
    Category["NACHOS"] = "nachos";
    Category["HOTDOG"] = "hotdog";
    Category["COMBO"] = "combo";
    Category["OTHER"] = "other";
})(Category || (exports.Category = Category = {}));
let Product = class Product {
    id;
    name;
    image;
    description;
    price;
    category;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'decimal', precision: 10, scale: 2, nullable: false }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Category,
        enumName: 'product_category_enum_v2',
    }),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.default = Product;
//# sourceMappingURL=product.entity.js.map