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
exports.Genre = void 0;
const branch_entity_1 = require("../branchs/branch.entity");
const typeorm_1 = require("typeorm");
var Genre;
(function (Genre) {
    Genre["ACTION"] = "action";
    Genre["ADVENTURE"] = "adventure";
    Genre["ANIMATION"] = "animation";
    Genre["COMEDY"] = "comedy";
    Genre["CRIME"] = "crime";
    Genre["DRAMA"] = "drama";
    Genre["FANTASY"] = "fantasy";
    Genre["HORROR"] = "horror";
    Genre["MYSTERY"] = "mystery";
    Genre["ROMANCE"] = "romance";
    Genre["SCI_FI"] = "sci_fi";
    Genre["THRILLER"] = "thriller";
    Genre["DOCUMENTARY"] = "documentary";
    Genre["FAMILY"] = "family";
    Genre["MUSICAL"] = "musical";
    Genre["WAR"] = "war";
    Genre["WESTERN"] = "western";
    Genre["HISTORICAL"] = "historical";
    Genre["SPORTS"] = "sports";
})(Genre || (exports.Genre = Genre = {}));
let Movie = class Movie {
    id;
    title;
    sinopsis;
    rating;
    genre;
    image;
    duration;
    branch;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Movie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Movie.prototype, "sinopsis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 2, scale: 1 }),
    __metadata("design:type", Number)
], Movie.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Genre }),
    __metadata("design:type", String)
], Movie.prototype, "genre", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Movie.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Movie.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => branch_entity_1.Branch, (branch) => branch.movies),
    __metadata("design:type", Array)
], Movie.prototype, "branch", void 0);
Movie = __decorate([
    (0, typeorm_1.Entity)()
], Movie);
exports.default = Movie;
//# sourceMappingURL=movie.entity.js.map