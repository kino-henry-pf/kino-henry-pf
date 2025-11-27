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
const typeorm_2 = require("typeorm");
const movie_entity_1 = __importStar(require("../movies/movie.entity"));
const user_entity_1 = require("../users/entity/user.entity");
const product_entity_1 = __importStar(require("../products/product.entity"));
const showtimes_entity_1 = __importStar(require("../showtimes/showtimes.entity"));
const branch_entity_1 = require("../branchs/branch.entity");
let SeederService = class SeederService {
    movieRepository;
    usersRepository;
    productsRepository;
    showtimeRepository;
    branchRepository;
    constructor(movieRepository, usersRepository, productsRepository, showtimeRepository, branchRepository) {
        this.movieRepository = movieRepository;
        this.usersRepository = usersRepository;
        this.productsRepository = productsRepository;
        this.showtimeRepository = showtimeRepository;
        this.branchRepository = branchRepository;
    }
    pickRandom(array, count) {
        return [...array].sort(() => Math.random() - 0.5).slice(0, count);
    }
    async seed() {
        console.log('Starting Seeder...');
        const branchesData = [
            {
                name: 'Kino Del Valle',
                address: 'Av. Universidad 1000, Del Valle, CDMX',
                latitude: 19.384478,
                longitude: -99.162131,
                googlePlaceId: 'ChIJd2CD0nP_0YURBoC6sVvTt0Y',
            },
            {
                name: 'Kino Coyoacán',
                address: 'Av. Miguel Ángel de Quevedo 209, Coyoacán, CDMX',
                latitude: 19.34521,
                longitude: -99.16277,
                googlePlaceId: 'ChIJV9t12Kb_0YURCxQ6B0U7_k8',
            },
            {
                name: 'Kino Polanco',
                address: 'Av. Presidente Masaryk 390, Polanco, CDMX',
                latitude: 19.432602,
                longitude: -99.20047,
                googlePlaceId: 'ChIJp2tHcGv_0YURPugxnUsx4Bc',
            },
            {
                name: 'Kino Reforma',
                address: 'Paseo de la Reforma 222, Juárez, CDMX',
                latitude: 19.42872,
                longitude: -99.15702,
                googlePlaceId: 'ChIJWX--c2D_0YURhGkP0vH-co4',
            },
            {
                name: 'Kino Satélite',
                address: 'Circuito Centro Comercial 2251, Cd. Satélite',
                latitude: 19.50021,
                longitude: -99.23712,
                googlePlaceId: 'ChIJLcA5plT_0YURnqsQ6m81q9o',
            },
            {
                name: 'Kino Santa Fe',
                address: 'Vasco de Quiroga 3800, Santa Fe, CDMX',
                latitude: 19.36435,
                longitude: -99.27484,
                googlePlaceId: 'ChIJZ1UTIWf_0YURjHb9IkA6EaE',
            },
            {
                name: 'Kino Lindavista',
                address: 'Insurgentes Norte 1820, Lindavista, CDMX',
                latitude: 19.49342,
                longitude: -99.13084,
                googlePlaceId: 'ChIJq8Dpq1D_0YURjKcWfvO83D0',
            },
        ];
        const savedBranches = await this.branchRepository.save(branchesData);
        console.log(`✓ Branches seeded (${savedBranches.length})`);
        const moviesData = [
            {
                title: 'Inception',
                sinopsis: 'A thief uses dream-sharing technology.',
                rating: 4.8,
                genre: movie_entity_1.Genre.SCI_FI,
                image: 'https://theposterdb.com/api/assets/52633',
                duration: 148,
            },
            {
                title: 'The Dark Knight',
                sinopsis: 'Batman faces the Joker.',
                rating: 4.9,
                genre: movie_entity_1.Genre.ACTION,
                image: 'https://theposterdb.com/api/assets/4792',
                duration: 152,
            },
            {
                title: 'La La Land',
                sinopsis: 'A jazz musician meets an actress.',
                rating: 4.5,
                genre: movie_entity_1.Genre.MUSICAL,
                image: 'https://theposterdb.com/api/assets/13422',
                duration: 128,
            },
            {
                title: 'Interstellar',
                sinopsis: 'Explorers travel through a wormhole.',
                rating: 4.7,
                genre: movie_entity_1.Genre.SCI_FI,
                image: 'https://theposterdb.com/api/assets/6461',
                duration: 169,
            },
            {
                title: 'The Conjuring',
                sinopsis: 'Paranormal investigators help a family.',
                rating: 4.2,
                genre: movie_entity_1.Genre.HORROR,
                image: 'https://theposterdb.com/api/assets/23525',
                duration: 112,
            },
            {
                title: 'Parasite',
                sinopsis: 'A poor family infiltrates a rich home.',
                rating: 4.9,
                genre: movie_entity_1.Genre.DRAMA,
                image: 'https://theposterdb.com/api/assets/47915',
                duration: 132,
            },
            {
                title: 'Toy Story',
                sinopsis: 'Toys come to life.',
                rating: 4.7,
                genre: movie_entity_1.Genre.ANIMATION,
                image: 'https://theposterdb.com/api/assets/457',
                duration: 81,
            },
            {
                title: 'The Notebook',
                sinopsis: 'Romantic drama from the 1940s.',
                rating: 4.3,
                genre: movie_entity_1.Genre.ROMANCE,
                image: 'https://theposterdb.com/api/assets/167079',
                duration: 123,
            },
            {
                title: 'The Grand Budapest Hotel',
                sinopsis: 'A concierge and his lobby boy.',
                rating: 4.6,
                genre: movie_entity_1.Genre.COMEDY,
                image: 'https://theposterdb.com/api/assets/54311',
                duration: 99,
            },
            {
                title: 'Saving Private Ryan',
                sinopsis: 'WWII rescue mission.',
                rating: 4.8,
                genre: movie_entity_1.Genre.WAR,
                image: 'https://theposterdb.com/api/assets/34772',
                duration: 169,
            },
        ];
        const savedMovies = [];
        for (const m of moviesData) {
            const exists = await this.movieRepository.findOne({
                where: { title: m.title },
            });
            savedMovies.push(exists ?? (await this.movieRepository.save(m)));
        }
        console.log(`✓ Movies seeded (${savedMovies.length})`);
        for (const movie of savedMovies) {
            const randomBranches = this.pickRandom(savedBranches, 2 + Math.floor(Math.random() * 3));
            movie.branches = randomBranches;
            await this.movieRepository.save(movie);
            console.log(`→ ${movie.title} linked to ${randomBranches.length} branches`);
        }
        const productsData = [
            {
                name: 'Palomitas Clásicas',
                image: 'https://res.cloudinary.com/db9panarm/image/upload/v1764199212/palomitas_mnsmvw.png',
                description: 'Clasicas con mantequilla',
                price: 75,
                category: product_entity_1.Category.POPCORN,
            },
            {
                name: 'Refresco Grande',
                image: 'https://res.cloudinary.com/db9panarm/image/upload/v1764199211/refresco_jtef2k.png',
                description: '1 litro bien frio',
                price: 60,
                category: product_entity_1.Category.SOFT_DRINK,
            },
            {
                name: 'Nachos con Queso',
                image: 'https://res.cloudinary.com/db9panarm/image/upload/v1764199214/nachos_qpoj94.png',
                description: 'Nachos calientes con queso',
                price: 85,
                category: product_entity_1.Category.NACHOS,
            },
            {
                name: 'Gomitas',
                image: 'https://res.cloudinary.com/db9panarm/image/upload/v1764199215/gomitas_ombpyi.png',
                description: 'Gomitas de sabores',
                price: 40,
                category: product_entity_1.Category.CANDY,
            },
            {
                name: 'Combo Pareja',
                image: 'https://res.cloudinary.com/db9panarm/image/upload/v1764199210/combo_luzag1.png',
                description: 'Palomitas + 2 refrescos',
                price: 150,
                category: product_entity_1.Category.COMBO,
            },
        ];
        for (const p of productsData) {
            const exists = await this.productsRepository.findOne({
                where: { name: p.name },
            });
            if (!exists)
                await this.productsRepository.save(p);
        }
        console.log('✓ Products seeded');
        const showtimesToCreate = [];
        for (const movie of savedMovies) {
            const branchesForShowtimes = this.pickRandom(savedBranches, 2);
            for (const branch of branchesForShowtimes) {
                showtimesToCreate.push({
                    movieId: movie.id,
                    branchId: branch.id,
                    roomId: crypto.randomUUID(),
                    startTime: new Date(`2025-12-${String(1 + Math.floor(Math.random() * 10)).padStart(2, '0')}T${String(12 + Math.floor(Math.random() * 10)).padStart(2, '0')}:00:00.000Z`),
                    language: Math.random() > 0.5 ? showtimes_entity_1.Language.DUBBED : showtimes_entity_1.Language.SUBTITLED,
                    format: Math.random() > 0.5 ? showtimes_entity_1.Format.TWO_D : showtimes_entity_1.Format.THREE_D,
                });
            }
        }
        for (const st of showtimesToCreate) {
            await this.showtimeRepository.save(st);
        }
        console.log(`✓ Showtimes created (${showtimesToCreate.length})`);
        console.log('Seeder Completed!');
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(product_entity_1.default)),
    __param(3, (0, typeorm_1.InjectRepository)(showtimes_entity_1.default)),
    __param(4, (0, typeorm_1.InjectRepository)(branch_entity_1.Branch)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map