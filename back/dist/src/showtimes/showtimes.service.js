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
exports.ShowtimesService = void 0;
const common_1 = require("@nestjs/common");
const showtimes_repository_1 = __importDefault(require("./showtimes.repository"));
const movies_service_1 = require("../movies/movies.service");
let ShowtimesService = class ShowtimesService {
    showtimesRepository;
    moviesService;
    constructor(showtimesRepository, moviesService) {
        this.showtimesRepository = showtimesRepository;
        this.moviesService = moviesService;
    }
    async findAll() {
        return await this.showtimesRepository.findAll();
    }
    async findById(id) {
        const showtime = await this.showtimesRepository.findById(id);
        if (!showtime)
            this.notFound(id);
        return showtime;
    }
    async createShowtime(dto) {
        const movie = await this.moviesService.findById(dto.movieId);
        if (!movie) {
            throw new common_1.NotFoundException('Movie not found');
        }
        return this.showtimesRepository.createMovie(dto);
    }
    async deleteShowTime(id) {
        const showtime = await this.showtimesRepository.deleteShowtime(id);
        if (!showtime)
            return this.notFound(id);
    }
    notFound(id) {
        throw new common_1.NotFoundException(`No showtime with an id of ${id} has been found.`);
    }
};
exports.ShowtimesService = ShowtimesService;
exports.ShowtimesService = ShowtimesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [showtimes_repository_1.default,
        movies_service_1.MoviesService])
], ShowtimesService);
//# sourceMappingURL=showtimes.service.js.map