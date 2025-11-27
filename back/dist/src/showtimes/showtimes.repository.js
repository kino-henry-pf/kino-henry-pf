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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const showtimes_entity_1 = __importDefault(require("./showtimes.entity"));
const typeorm_2 = require("typeorm");
let ShowtimesRepository = class ShowtimesRepository {
    showtimesRepository;
    constructor(showtimesRepository) {
        this.showtimesRepository = showtimesRepository;
    }
    async findAll() {
        return await this.showtimesRepository.find({
            relations: ['movie'],
        });
    }
    async findById(id) {
        const showtime = await this.findOneOrNull(id);
        if (!showtime)
            return null;
        return showtime;
    }
    async createMovie(dto) {
        const newShowtime = this.showtimesRepository.create(dto);
        return await this.showtimesRepository.save(newShowtime);
    }
    async deleteShowtime(id) {
        const showtime = await this.findOneOrNull(id);
        if (!showtime)
            return null;
        await this.showtimesRepository.delete(id);
        return showtime;
    }
    async findOneOrNull(id) {
        const showtime = await this.showtimesRepository.findOne({
            where: { id },
            relations: ['movie'],
        });
        return showtime || null;
    }
};
ShowtimesRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(showtimes_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ShowtimesRepository);
exports.default = ShowtimesRepository;
//# sourceMappingURL=showtimes.repository.js.map