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
exports.MoviesRepository = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = __importDefault(require("./movie.entity"));
const typeorm_2 = require("typeorm");
let MoviesRepository = class MoviesRepository {
    moviesRepository;
    constructor(moviesRepository) {
        this.moviesRepository = moviesRepository;
    }
    async findAll() {
        return await this.moviesRepository.find();
    }
    async findByTitle(title) {
        return await this.moviesRepository.find({
            where: { title: (0, typeorm_2.ILike)(`%${title}%`) },
        });
    }
    async findById(id) {
        const movie = await this.findOneOrNull(id);
        if (!movie)
            return null;
        return movie;
    }
    async createMovie(dto) {
        const newMovie = this.moviesRepository.create(dto);
        return await this.moviesRepository.save(newMovie);
    }
    async updateMovie(id, dto) {
        const movie = await this.findOneOrNull(id);
        if (!movie)
            return null;
        const updated = Object.assign(movie, dto);
        await this.moviesRepository.save(updated);
        return await this.findOneOrNull(id);
    }
    async deleteMovie(id) {
        const movie = await this.findOneOrNull(id);
        if (!movie)
            return null;
        await this.moviesRepository.delete(id);
        return movie;
    }
    async findOneOrNull(id) {
        const movie = await this.moviesRepository.findOneBy({ id });
        if (!movie)
            return null;
        return movie;
    }
};
exports.MoviesRepository = MoviesRepository;
exports.MoviesRepository = MoviesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MoviesRepository);
//# sourceMappingURL=movie.repository.js.map