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
exports.ShowtimesModule = void 0;
const common_1 = require("@nestjs/common");
const showtimes_service_1 = require("./showtimes.service");
const showtimes_controller_1 = require("./showtimes.controller");
const showtimes_repository_1 = __importDefault(require("./showtimes.repository"));
const typeorm_1 = require("@nestjs/typeorm");
const showtimes_entity_1 = __importDefault(require("./showtimes.entity"));
const movies_module_1 = require("../movies/movies.module");
let ShowtimesModule = class ShowtimesModule {
};
exports.ShowtimesModule = ShowtimesModule;
exports.ShowtimesModule = ShowtimesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([showtimes_entity_1.default]), movies_module_1.MoviesModule],
        controllers: [showtimes_controller_1.ShowtimesController],
        providers: [showtimes_service_1.ShowtimesService, showtimes_repository_1.default],
    })
], ShowtimesModule);
//# sourceMappingURL=showtimes.module.js.map