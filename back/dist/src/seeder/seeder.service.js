"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const movie_entity_1 = __importStar(require("../movies/movie.entity"));
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entity/user.entity");
const product_entity_1 = __importStar(require("../products/product.entity"));
const showtimes_entity_1 = __importStar(require("../showtimes/showtimes.entity"));
let SeederService = class SeederService {
    movieRepository;
    usersRepository;
    productsRepository;
    showtimeRepository;
    constructor(movieRepository, usersRepository, productsRepository, showtimeRepository) {
        this.movieRepository = movieRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
        this.showtimeRepository = showtimeRepository;
    }
    async seed() {
        const movies = [
            {
                title: 'Inception',
                sinopsis: 'A thief who uses dream-sharing technology is tasked with planting an idea into a target’s subconscious.',
                rating: 4.8,
                genre: movie_entity_1.Genre.SCI_FI,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 148,
            },
            {
                title: 'The Dark Knight',
                sinopsis: 'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into chaos.',
                rating: 4.9,
                genre: movie_entity_1.Genre.ACTION,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 152,
            },
            {
                title: 'La La Land',
                sinopsis: 'A jazz musician and an aspiring actress fall in love while pursuing their dreams.',
                rating: 4.5,
                genre: movie_entity_1.Genre.MUSICAL,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 128,
            },
            {
                title: 'Interstellar',
                sinopsis: 'A team of explorers travel through a wormhole in search of a new home for humanity.',
                rating: 4.7,
                genre: movie_entity_1.Genre.SCI_FI,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 169,
            },
            {
                title: 'The Conjuring',
                sinopsis: 'Paranormal investigators help a family terrorized by a dark entity.',
                rating: 4.2,
                genre: movie_entity_1.Genre.HORROR,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 112,
            },
            {
                title: 'Parasite',
                sinopsis: 'A poor family schemes to infiltrate a wealthy household with unexpected consequences.',
                rating: 4.9,
                genre: movie_entity_1.Genre.DRAMA,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 132,
            },
            {
                title: 'Toy Story',
                sinopsis: 'A group of toys come to life and navigate friendship when a new toy arrives.',
                rating: 4.7,
                genre: movie_entity_1.Genre.ANIMATION,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 81,
            },
            {
                title: 'The Notebook',
                sinopsis: 'A romantic drama about a young couple who fall deeply in love in the 1940s.',
                rating: 4.3,
                genre: movie_entity_1.Genre.ROMANCE,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 123,
            },
            {
                title: 'The Grand Budapest Hotel',
                sinopsis: 'A quirky concierge and his lobby boy become entangled in a murder mystery.',
                rating: 4.6,
                genre: movie_entity_1.Genre.COMEDY,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 99,
            },
            {
                title: 'Saving Private Ryan',
                sinopsis: 'A group of soldiers embark on a mission to rescue a paratrooper during World War II.',
                rating: 4.8,
                genre: movie_entity_1.Genre.WAR,
                image: 'https://fakeimg.com/movie.jpg',
                duration: 169,
            },
        ];
        const products = [
            {
                name: 'Palomitas Clásicas',
                image: 'https://example.com/popcorn-classic.jpg',
                description: 'Palomitas de maíz frescas con mantequilla derretida.',
                price: 75.0,
                category: product_entity_1.Category.POPCORN,
            },
            {
                name: 'Palomitas Caramelo',
                image: 'https://example.com/popcorn-caramel.jpg',
                description: 'Palomitas cubiertas con caramelo dulce y crujiente.',
                price: 95.0,
                category: product_entity_1.Category.POPCORN,
            },
            {
                name: 'Refresco Grande',
                image: 'https://example.com/soft-drink-large.jpg',
                description: 'Refresco de cola de 1 litro, servido frío.',
                price: 60.0,
                category: product_entity_1.Category.SOFT_DRINK,
            },
            {
                name: 'Agua Embotellada',
                image: 'https://example.com/water.jpg',
                description: 'Botella de agua purificada de 600 ml.',
                price: 35.0,
                category: product_entity_1.Category.WATER,
            },
            {
                name: 'Jugo de Naranja',
                image: 'https://example.com/orange-juice.jpg',
                description: 'Jugo natural de naranja en botella individual.',
                price: 45.0,
                category: product_entity_1.Category.JUICE,
            },
            {
                name: 'Gomitas SurtiMix',
                image: 'https://example.com/gummies.jpg',
                description: 'Bolsa de gomitas surtidas con sabores frutales.',
                price: 40.0,
                category: product_entity_1.Category.CANDY,
            },
            {
                name: 'Chocolate Crunch',
                image: 'https://example.com/chocolate.jpg',
                description: 'Barra de chocolate crujiente con arroz inflado.',
                price: 42.0,
                category: product_entity_1.Category.CHOCOLATE,
            },
            {
                name: 'Chicles Menta Fresh',
                image: 'https://example.com/gum.jpg',
                description: 'Paquete de chicles sabor menta extra fuerte.',
                price: 25.0,
                category: product_entity_1.Category.GUM,
            },
            {
                name: 'Nachos con Queso',
                image: 'https://example.com/nachos.jpg',
                description: 'Nachos servidos con queso cheddar caliente.',
                price: 85.0,
                category: product_entity_1.Category.NACHOS,
            },
            {
                name: 'Combo Pareja',
                image: 'https://example.com/combo-couple.jpg',
                description: 'Palomitas grandes + 2 refrescos medianos.',
                price: 150.0,
                category: product_entity_1.Category.COMBO,
            },
        ];
        const showtimes = [
            {
                movieId: '307a1f3c-7bd5-447e-a6e5-d9b826239c10',
                branchId: '8b5f1c4d-7c68-4e19-9bb2-f7b6f91c884d',
                roomId: 'c923c47f-bda2-49e7-ac14-7fc38fd6b912',
                startTime: new Date('2025-12-01T18:00:00.000Z'),
                language: showtimes_entity_1.Language.DUBBED,
                format: showtimes_entity_1.Format.TWO_D,
            },
            {
                movieId: '307a1f3c-7bd5-447e-a6e5-d9b826239c10',
                branchId: 'bbd7c710-22f9-4d42-963e-49f5e0f82b5e',
                roomId: '387e4bd8-9cf1-41bb-9a92-9f176df70f33',
                startTime: new Date('2025-12-01T21:00:00.000Z'),
                language: showtimes_entity_1.Language.SUBTITLED,
                format: showtimes_entity_1.Format.THREE_D,
            },
            {
                movieId: '25ad5e3b-280b-4a48-b8ad-66962725fa03',
                branchId: '5a739056-7ae2-41b8-8ecb-af54c6ae7a10',
                roomId: 'b87dc2e3-a90f-4e24-b9e5-296b39af1dc0',
                startTime: new Date('2025-12-02T17:30:00.000Z'),
                language: showtimes_entity_1.Language.SUBTITLED,
                format: showtimes_entity_1.Format.TWO_D,
            },
            {
                movieId: '25ad5e3b-280b-4a48-b8ad-66962725fa03',
                branchId: 'e5d63b89-1e37-4c08-b4e5-752fcfe6cc12',
                roomId: '3d961280-b52c-4e6f-8f7b-5c3ccaa8a9df',
                startTime: new Date('2025-12-02T20:30:00.000Z'),
                language: showtimes_entity_1.Language.DUBBED,
                format: showtimes_entity_1.Format.THREE_D,
            },
            {
                movieId: '2304dd63-a42c-4d9f-8102-1f801ba86f6e',
                branchId: '1f7c61ab-8e1c-47da-bbe8-7f61b4f0b121',
                roomId: '52a4eace-1a02-4e8b-bb2f-c48f664753db',
                startTime: new Date('2025-12-03T19:00:00.000Z'),
                language: showtimes_entity_1.Language.SUBTITLED,
                format: showtimes_entity_1.Format.TWO_D,
            },
            {
                movieId: '2304dd63-a42c-4d9f-8102-1f801ba86f6e',
                branchId: '138a15a4-a2fb-45d3-a304-b2e6bb8fb4cd',
                roomId: '680a49e6-e405-4c58-ad85-9b15ace0ed32',
                startTime: new Date('2025-12-03T22:00:00.000Z'),
                language: showtimes_entity_1.Language.DUBBED,
                format: showtimes_entity_1.Format.TWO_D,
            },
            {
                movieId: 'b504a9e4-1170-4dc0-bc63-f6599a07665d',
                branchId: '8391c1f7-2b92-4d30-90b6-01925020cfe3',
                roomId: '91f20554-a8ef-4ee0-99bb-d80d8a87fe09',
                startTime: new Date('2025-12-04T18:45:00.000Z'),
                language: showtimes_entity_1.Language.SUBTITLED,
                format: showtimes_entity_1.Format.TWO_D,
            },
            {
                movieId: 'b504a9e4-1170-4dc0-bc63-f6599a07665d',
                branchId: 'b9ea3cd2-b969-4fe5-a63a-7c19192880f7',
                roomId: '3c1e25f2-0b85-4cb6-b71e-38616fc4cb0f',
                startTime: new Date('2025-12-04T21:30:00.000Z'),
                language: showtimes_entity_1.Language.DUBBED,
                format: showtimes_entity_1.Format.THREE_D,
            },
            {
                movieId: 'b74288a6-a41a-4043-8194-d11fd79e83b3',
                branchId: 'deff270d-2500-4abd-9c82-b5d52b8f4db0',
                roomId: '3dc36a67-e4e0-43dd-95ce-e19ccca690a8',
                startTime: new Date('2025-12-05T19:15:00.000Z'),
                language: showtimes_entity_1.Language.SUBTITLED,
                format: showtimes_entity_1.Format.TWO_D,
            },
        ];
        for (const movieData of movies) {
            const exists = await this.movieRepository.findOne({
                where: { title: movieData.title },
            });
            if (!exists)
                await this.movieRepository.save(movieData);
        }
        console.log('Movies seeded.');
        for (const productData of products) {
            const exists = await this.productsRepository.findOne({
                where: { name: productData.name },
            });
            if (!exists)
                await this.productsRepository.save(productData);
        }
        console.log('Products seeded.');
        for (const showtimeData of showtimes) {
            const exists = await this.showtimeRepository.find();
            if (exists.length < 10)
                await this.showtimeRepository.save(showtimeData);
        }
        console.log('Showtimes seeded.');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.default)),
    __param(3, (0, typeorm_1.InjectRepository)(showtimes_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map