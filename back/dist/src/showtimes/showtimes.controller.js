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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowtimesController = void 0;
const common_1 = require("@nestjs/common");
const showtimes_service_1 = require("./showtimes.service");
const create_showtime_dto_1 = require("./DTOs/create-showtime.dto");
let ShowtimesController = class ShowtimesController {
    showtimesService;
    constructor(showtimesService) {
        this.showtimesService = showtimesService;
    }
    async findAll() {
        return await this.showtimesService.findAll();
    }
    async findById(id) {
        return await this.showtimesService.findById(id);
    }
    async createShowtime(dto) {
        return await this.showtimesService.createShowtime(dto);
    }
    async deleteShowTime(id) {
        return await this.showtimesService.deleteShowTime(id);
    }
};
exports.ShowtimesController = ShowtimesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ShowtimesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShowtimesController.prototype, "findById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_showtime_dto_1.CreateShowtimeDto]),
    __metadata("design:returntype", Promise)
], ShowtimesController.prototype, "createShowtime", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ShowtimesController.prototype, "deleteShowTime", null);
exports.ShowtimesController = ShowtimesController = __decorate([
    (0, common_1.Controller)('showtimes'),
    __metadata("design:paramtypes", [showtimes_service_1.ShowtimesService])
], ShowtimesController);
//# sourceMappingURL=showtimes.controller.js.map