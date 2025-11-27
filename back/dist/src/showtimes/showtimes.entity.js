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
exports.Format = exports.Language = void 0;
const class_transformer_1 = require("class-transformer");
const movie_entity_1 = __importDefault(require("../movies/movie.entity"));
const typeorm_1 = require("typeorm");
var Language;
(function (Language) {
    Language["DUBBED"] = "dubbed";
    Language["SUBTITLED"] = "subtitled";
})(Language || (exports.Language = Language = {}));
var Format;
(function (Format) {
    Format["TWO_D"] = "2D";
    Format["THREE_D"] = "3D";
})(Format || (exports.Format = Format = {}));
let Showtime = class Showtime {
    id;
    movie;
    movieId;
    branchId;
    roomId;
    startTime;
    language;
    format;
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Showtime.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => movie_entity_1.default, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'movieId' }),
    __metadata("design:type", movie_entity_1.default)
], Showtime.prototype, "movie", void 0);
__decorate([
    (0, class_transformer_1.Exclude)(),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Showtime.prototype, "movieId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Showtime.prototype, "branchId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Showtime.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Showtime.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Language }),
    __metadata("design:type", String)
], Showtime.prototype, "language", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Format }),
    __metadata("design:type", String)
], Showtime.prototype, "format", void 0);
Showtime = __decorate([
    (0, typeorm_1.Entity)('showtimes')
], Showtime);
exports.default = Showtime;
//# sourceMappingURL=showtimes.entity.js.map