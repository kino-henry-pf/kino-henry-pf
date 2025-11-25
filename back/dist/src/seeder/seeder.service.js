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
let SeederService = class SeederService {
    movieRepository;
    usersRepository;
    constructor(movieRepository, usersRepository) {
        this.movieRepository = movieRepository;
        this.usersRepository = usersRepository;
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
        for (const movieData of movies) {
            const exists = await this.movieRepository.findOne({
                where: { title: movieData.title },
            });
            if (!exists)
                await this.movieRepository.save(movieData);
            console.log("Movies seeded.");
        }
        const users = [
            {
                id: "1",
                name: "Lucía Martínez",
                email: "lucia.martinez@example.com",
                password: "Passw0rd!1",
                address: "Calle Luna 123, Madrid"
            },
            {
                id: "2",
                name: "Carlos Pérez",
                email: "carlos.perez@example.com",
                password: "SecurePass22",
                address: "Avenida del Sol 45, Barcelona"
            },
            {
                id: "3",
                name: "María González",
                email: "maria.gonzalez@example.com",
                password: "MyPwd#333",
                address: "Calle Mayor 78, Valencia"
            },
            {
                id: "4",
                name: "Javier López",
                email: "javier.lopez@example.com",
                password: "ClaveSegura44",
                address: "Calle Río Verde 12, Sevilla"
            },
            {
                id: "5",
                name: "Ana Torres",
                email: "ana.torres@example.com",
                password: "PwdAna55!",
                address: "Paseo de la Paz 90, Zaragoza"
            },
            {
                id: "6",
                name: "Diego Ruiz",
                email: "diego.ruiz@example.com",
                password: "DiegoPwd66",
                address: "Calle Jardín 5, Bilbao"
            },
            {
                id: "7",
                name: "Laura Fernández",
                email: "laura.fernandez@example.com",
                password: "LauraPass77",
                address: "Calle Primavera 33, Málaga"
            },
            {
                id: "8",
                name: "Sergio Ramírez",
                email: "sergio.ramirez@example.com",
                password: "SRamirez88*",
                address: "Avenida Centro 101, Murcia"
            },
            {
                id: "9",
                name: "Paula Sánchez",
                email: "paula.sanchez@example.com",
                password: "PaulaSecure99",
                address: "Calle Norte 8, Valladolid"
            },
            {
                id: "10",
                name: "Hugo Castro",
                email: "hugo.castro@example.com",
                password: "HugoPass100!",
                address: "Boulevard del Mar 60, Alicante"
            }
        ];
        for (const userData of users) {
            const exists = await this.usersRepository.findOne({
                where: { email: userData.email },
            });
            if (!exists)
                await this.usersRepository.save(userData);
            console.log("Users seeded.");
        }
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.default)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], SeederService);
//# sourceMappingURL=seeder.service.js.map