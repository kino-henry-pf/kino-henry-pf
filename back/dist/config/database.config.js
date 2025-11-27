"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config_1 = require("@nestjs/config");
const movie_entity_1 = __importDefault(require("../src/movies/movie.entity"));
const user_entity_1 = require("../src/users/entity/user.entity");
const product_entity_1 = __importDefault(require("../src/products/product.entity"));
const showtimes_entity_1 = __importDefault(require("../src/showtimes/showtimes.entity"));
exports.typeOrmConfig = (0, config_1.registerAs)('database', () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE,
    entities: [movie_entity_1.default, user_entity_1.User, product_entity_1.default, showtimes_entity_1.default],
    synchronize: Number(process.env.DB_SYNC) === 1,
    dropSchema: Number(process.env.DB_DROP) === 1,
    ssl: {
        rejectUnauthorized: false,
    },
}));
//# sourceMappingURL=database.config.js.map