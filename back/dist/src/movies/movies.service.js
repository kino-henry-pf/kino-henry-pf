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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const movie_repository_1 = require("./movie.repository");
const cloudinary_service_1 = __importDefault(require("../cloudinary/cloudinary.service"));
let MoviesService = class MoviesService {
    moviesRepository;
    cloudinaryService;
    constructor(moviesRepository, cloudinaryService) {
        this.moviesRepository = moviesRepository;
        this.cloudinaryService = cloudinaryService;
    }
    async findAll() {
        return await this.moviesRepository.findAll();
    }
    async findByTitle(title) {
        const movies = await this.moviesRepository.findByTitle(title);
        return movies;
    }
    async findById(id) {
        const movie = await this.moviesRepository.findById(id);
        return movie ?? this.notFound(id);
    }
    async createMovie(dto, file) {
        try {
            if (!file) {
                throw new common_1.BadRequestException('Image file is required');
            }
            const imageUrl = await this.cloudinaryService.uploadImage(file, 'kino/movies');
            return await this.moviesRepository.createMovie({
                ...dto,
                image: imageUrl,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating new movie: ' + error);
        }
    }
    async updateMovie(id, dto, file) {
        try {
            const movie = await this.moviesRepository.findById(id);
            if (!movie)
                return this.notFound(id);
            let imageUrl = dto.image;
            if (file) {
                imageUrl = await this.cloudinaryService.uploadImage(file, 'kino/movies');
            }
            const updated = await this.moviesRepository.updateMovie(id, {
                ...dto,
                image: imageUrl || movie.image,
            });
            return updated;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error updating movie: ' + error);
        }
    }
    async deleteMovie(id) {
        const movie = await this.moviesRepository.deleteMovie(id);
        if (!movie)
            this.notFound(id);
    }
    notFound(id) {
        throw new common_1.NotFoundException(`No movie with an id of ${id} has been found.`);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [movie_repository_1.MoviesRepository,
        cloudinary_service_1.default])
], MoviesService);
//# sourceMappingURL=movies.service.js.map