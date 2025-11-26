import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Movie, { Genre } from '../movies/movie.entity';
import { User } from '../users/entity/user.entity';
import Product, { Category } from '../products/product.entity';
import Showtime, { Format, Language } from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
    @InjectRepository(Branch)
    private branchRepository: Repository<Branch>,
  ) {}

  private pickRandom<T>(array: T[], count: number): T[] {
    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
  }

  async seed() {
    console.log('Starting Seeder...');
    const branchesData: Partial<Branch>[] = [
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

    const moviesData: Partial<Movie>[] = [
      {
        title: 'Inception',
        sinopsis: 'A thief uses dream-sharing technology.',
        rating: 4.8,
        genre: Genre.SCI_FI,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 148,
      },
      {
        title: 'The Dark Knight',
        sinopsis: 'Batman faces the Joker.',
        rating: 4.9,
        genre: Genre.ACTION,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 152,
      },
      {
        title: 'La La Land',
        sinopsis: 'A jazz musician meets an actress.',
        rating: 4.5,
        genre: Genre.MUSICAL,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 128,
      },
      {
        title: 'Interstellar',
        sinopsis: 'Explorers travel through a wormhole.',
        rating: 4.7,
        genre: Genre.SCI_FI,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 169,
      },
      {
        title: 'The Conjuring',
        sinopsis: 'Paranormal investigators help a family.',
        rating: 4.2,
        genre: Genre.HORROR,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 112,
      },
      {
        title: 'Parasite',
        sinopsis: 'A poor family infiltrates a rich home.',
        rating: 4.9,
        genre: Genre.DRAMA,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 132,
      },
      {
        title: 'Toy Story',
        sinopsis: 'Toys come to life.',
        rating: 4.7,
        genre: Genre.ANIMATION,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 81,
      },
      {
        title: 'The Notebook',
        sinopsis: 'Romantic drama from the 1940s.',
        rating: 4.3,
        genre: Genre.ROMANCE,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 123,
      },
      {
        title: 'The Grand Budapest Hotel',
        sinopsis: 'A concierge and his lobby boy.',
        rating: 4.6,
        genre: Genre.COMEDY,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 99,
      },
      {
        title: 'Saving Private Ryan',
        sinopsis: 'WWII rescue mission.',
        rating: 4.8,
        genre: Genre.WAR,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 169,
      },
    ];

    const savedMovies: Movie[] = [];
    for (const m of moviesData) {
      const exists = await this.movieRepository.findOne({
        where: { title: m.title },
      });
      savedMovies.push(exists ?? (await this.movieRepository.save(m)));
    }
    console.log(`✓ Movies seeded (${savedMovies.length})`);

    for (const movie of savedMovies) {
      const randomBranches = this.pickRandom(
        savedBranches,
        2 + Math.floor(Math.random() * 3),
      );

      movie.branches = randomBranches;
      await this.movieRepository.save(movie);

      console.log(
        `→ ${movie.title} linked to ${randomBranches.length} branches`,
      );
    }

    const productsData: Partial<Product>[] = [
      {
        name: 'Palomitas Clásicas',
        image: 'https://example.com/popcorn.jpg',
        description: 'Clasicas con mantequilla',
        price: 75,
        category: Category.POPCORN,
      },
      {
        name: 'Refresco Grande',
        image: 'https://example.com/refresco.jpg',
        description: '1 litro bien frio',
        price: 60,
        category: Category.SOFT_DRINK,
      },
      {
        name: 'Nachos con Queso',
        image: 'https://example.com/nachos.jpg',
        description: 'Nachos calientes con queso',
        price: 85,
        category: Category.NACHOS,
      },
      {
        name: 'Gomitas',
        image: 'https://example.com/gomitas.jpg',
        description: 'Gomitas de sabores',
        price: 40,
        category: Category.CANDY,
      },
      {
        name: 'Combo Pareja',
        image: 'https://example.com/combo.jpg',
        description: 'Palomitas + 2 refrescos',
        price: 150,
        category: Category.COMBO,
      },
    ];

    for (const p of productsData) {
      const exists = await this.productsRepository.findOne({
        where: { name: p.name },
      });
      if (!exists) await this.productsRepository.save(p);
    }
    console.log('✓ Products seeded');

    const showtimesToCreate: Partial<Showtime>[] = [];

    for (const movie of savedMovies) {
      const branchesForShowtimes = this.pickRandom(savedBranches, 2);

      for (const branch of branchesForShowtimes) {
        showtimesToCreate.push({
          movieId: movie.id,
          branchId: branch.id,
          roomId: crypto.randomUUID(),
          startTime: new Date(
            `2025-12-${String(1 + Math.floor(Math.random() * 10)).padStart(2, '0')}T${String(
              12 + Math.floor(Math.random() * 10),
            ).padStart(2, '0')}:00:00.000Z`,
          ),
          language: Math.random() > 0.5 ? Language.DUBBED : Language.SUBTITLED,
          format: Math.random() > 0.5 ? Format.TWO_D : Format.THREE_D,
        });
      }
    }

    for (const st of showtimesToCreate) {
      await this.showtimeRepository.save(st);
    }

    console.log(`✓ Showtimes created (${showtimesToCreate.length})`);
    console.log('Seeder Completed!');
  }
}
