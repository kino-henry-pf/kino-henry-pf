"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
const movies_controller_1 = require("./movies.controller");
const movie_repository_1 = require("./movie.repository");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = __importDefault(require("./movie.entity"));
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
let MoviesModule = class MoviesModule {
};
exports.MoviesModule = MoviesModule;
exports.MoviesModule = MoviesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([movie_entity_1.default]), cloudinary_module_1.CloudinaryModule],
        controllers: [movies_controller_1.MoviesController],
        providers: [movies_service_1.MoviesService, movie_repository_1.MoviesRepository],
    })
], MoviesModule);
//# sourceMappingURL=movies.module.js.map