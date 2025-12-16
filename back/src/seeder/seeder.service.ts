import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Movie, { Genre } from '../movies/movie.entity';
import { User } from '../users/entity/user.entity';
import Product, { Category } from '../products/product.entity';
import Showtime, { Format, Language } from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';
import { BranchProduct } from '../branchsproducts/branch_products.entity';
import Room from '../rooms/rooms.entity';
import { RoomsService } from '../rooms/rooms.service';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Showtime)
    private showtimeRepository: Repository<Showtime>,
    @InjectRepository(Branch) private branchRepository: Repository<Branch>,
    @InjectRepository(BranchProduct)
    private bpRepository: Repository<BranchProduct>,
    @InjectRepository(Room) private roomRepository: Repository<Room>,
    private readonly roomsService: RoomsService,
  ) {}

  /* -------------------------------- HELPERS -------------------------------- */

  private pickRandom<T>(array: T[], count: number): T[] {
    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private getRandomFutureDate(): Date {
    const baseDate = new Date('2025-12-18T12:00:00.000Z');
    const daysToAdd = this.randomInt(1, 20);
    const hoursToAdd = this.randomInt(0, 10);

    const date = new Date(baseDate);
    date.setDate(date.getDate() + daysToAdd);
    date.setHours(12 + hoursToAdd);

    return date;
  }

  /* --------------------------------- SEED ---------------------------------- */

  async seed() {
    console.log('\n--- STARTING DATABASE SEEDER ---');

    /* ------------------------------- BRANCHES ------------------------------- */

    console.log('\n> Seeding Branches...');
    let savedBranches = await this.branchRepository.find();

    if (savedBranches.length === 0) {
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
      ];

      savedBranches = await this.branchRepository.save(branchesData);
      console.log(`  ✓ Created ${savedBranches.length} branches`);
    } else {
      console.log('  ✓ Branches already exist, skipping');
    }

    /* -------------------------------- ROOMS -------------------------------- */

    console.log('\n> Seeding Rooms...');
    let savedRooms = await this.roomRepository.find();

    if (savedRooms.length === 0) {
      const rooms: Room[] = [];

      for (const branch of savedBranches) {
        for (let i = 1; i <= 3; i++) {
          const room = await this.roomsService.createRoom({
            name: `Room ${i}`,
            branchId: branch.id,
          });
          rooms.push(room);
        }
      }

      savedRooms = rooms;
      console.log(`  ✓ Created ${savedRooms.length} rooms`);
    } else {
      console.log('  ✓ Rooms already exist, skipping');
    }

    /* -------------------------------- MOVIES ------------------------------- */

    console.log('\n> Seeding Movies...');

    const moviesData: Partial<Movie>[] = [
      {
        title: 'Inception',
        synopsis: 'A thief uses dream-sharing technology.',
        rating: 4.8,
        genre: Genre.SCI_FI,
        image: 'https://theposterdb.com/api/assets/52633',
        duration: 148,
      },
      {
        title: 'The Dark Knight',
        synopsis: 'Batman faces the Joker.',
        rating: 4.9,
        genre: Genre.ACTION,
        image: 'https://theposterdb.com/api/assets/4792',
        duration: 152,
      },
      {
        title: 'La La Land',
        synopsis: 'A jazz musician meets an actress.',
        rating: 4.5,
        genre: Genre.MUSICAL,
        image: 'https://theposterdb.com/api/assets/13422',
        duration: 128,
      },
      {
        title: 'Interstellar',
        synopsis: 'Explorers travel through a wormhole.',
        rating: 4.7,
        genre: Genre.SCI_FI,
        image: 'https://theposterdb.com/api/assets/6461',
        duration: 169,
      },
      {
        title: 'Parasite',
        synopsis: 'A poor family infiltrates a wealthy household.',
        rating: 4.6,
        genre: Genre.THRILLER,
        image: 'https://theposterdb.com/api/assets/47915',
        duration: 132,
      },
      {
        title: 'The Godfather',
        synopsis:
          'The aging patriarch of a crime dynasty transfers control to his son.',
        rating: 4.9,
        genre: Genre.CRIME,
        image: 'https://theposterdb.com/api/assets/8935',
        duration: 175,
      },
      {
        title: 'Whiplash',
        synopsis: 'A young drummer faces an abusive music instructor.',
        rating: 4.7,
        genre: Genre.DRAMA,
        image: 'https://theposterdb.com/api/assets/54134',
        duration: 106,
      },
      {
        title: 'Spirited Away',
        synopsis: 'A girl enters a magical world ruled by spirits.',
        rating: 4.8,
        genre: Genre.ANIMATION,
        image: 'https://theposterdb.com/api/assets/405',
        duration: 125,
      },
      {
        title: 'The Shawshank Redemption',
        synopsis: 'Two imprisoned men bond over years of incarceration.',
        rating: 4.9,
        genre: Genre.DRAMA,
        image: 'https://theposterdb.com/api/assets/51857',
        duration: 142,
      },
      {
        title: 'Get Out',
        synopsis:
          'A young man uncovers disturbing secrets while visiting his girlfriend’s family.',
        rating: 4.4,
        genre: Genre.HORROR,
        image: 'https://theposterdb.com/api/assets/260979',
        duration: 104,
      },
      {
        title: 'The Grand Budapest Hotel',
        synopsis:
          'A concierge and his protégé become embroiled in a murder mystery.',
        rating: 4.3,
        genre: Genre.COMEDY,
        image: 'https://theposterdb.com/api/assets/54311',
        duration: 99,
      },
      {
        title: 'Titanic',
        synopsis: 'A romance unfolds aboard the ill-fated RMS Titanic.',
        rating: 4.4,
        genre: Genre.ROMANCE,
        image: 'https://theposterdb.com/api/assets/101730',
        duration: 195,
      },
      {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        synopsis: 'A hobbit begins a quest to destroy a powerful ring.',
        rating: 4.8,
        genre: Genre.FANTASY,
        image: 'https://theposterdb.com/api/assets/1719',
        duration: 178,
      },
      {
        title: 'Saving Private Ryan',
        synopsis: 'Soldiers search for a paratrooper during WWII.',
        rating: 4.7,
        genre: Genre.WAR,
        image: 'https://theposterdb.com/api/assets/34772',
        duration: 169,
      },
    ];

    const existingMovies = await this.movieRepository.find();
    const existingTitles = new Set(existingMovies.map((m) => m.title));

    const moviesToInsert = moviesData.filter(
      (m) => !existingTitles.has(m.title),
    );

    if (moviesToInsert.length > 0) {
      await this.movieRepository.save(moviesToInsert);
      console.log(`  ✓ Inserted ${moviesToInsert.length} movies`);
    }

    const savedMovies = await this.movieRepository.find();
    console.log(`  ✓ Total movies available: ${savedMovies.length}`);

    // Link all movies to all branches
    for (const movie of savedMovies) {
      movie.branches = savedBranches;
    }
    await this.movieRepository.save(savedMovies);
    console.log('  ✓ Linked all movies to all branches');

    /* ------------------------------- PRODUCTS ------------------------------- */

    console.log('\n> Seeding Products...');
    const productCount = await this.productsRepository.count();

    if (productCount === 0) {
      const productsData: Partial<Product>[] = [
        {
          name: 'Classic Popcorn',
          description: 'Classic popcorn with butter',
          price: 75,
          category: Category.POPCORN,
        },
        {
          name: 'Large Soda',
          description: 'Large fountain soda',
          price: 60,
          category: Category.SOFT_DRINK,
        },
        {
          name: 'Nachos with Cheese',
          description: 'Nachos with melted cheddar cheese',
          price: 85,
          category: Category.NACHOS,
        },
        {
          name: 'Candy',
          description: 'Classic fruit-flavored candy',
          price: 45,
          category: Category.CANDY,
        },
        {
          name: 'Couple Combo',
          description: 'Includes large popcorn and two large sodas',
          price: 145,
          category: Category.COMBO,
        },
      ];

      await this.productsRepository.save(productsData);
      console.log('  ✓ Products created');
    }

    /* ------------------------------- SHOWTIMES ------------------------------- */

    console.log('\n> Seeding Showtimes...');
    const showtimeCount = await this.showtimeRepository.count();

    if (showtimeCount === 0) {
      const showtimes: Partial<Showtime>[] = [];

      for (const movie of savedMovies) {
        for (const branch of savedBranches) {
          const roomsForBranch = savedRooms.filter(
            (room) => room.branchId === branch.id,
          );

          const showtimesPerBranch = this.randomInt(1, 3);

          for (let i = 0; i < showtimesPerBranch; i++) {
            const room = this.pickRandom(roomsForBranch, 1)[0];

            showtimes.push({
              movieId: movie.id,
              roomId: room.id,
              startTime: this.getRandomFutureDate(),
              language:
                Math.random() > 0.5 ? Language.DUBBED : Language.SUBTITLED,
              format: Math.random() > 0.7 ? Format.THREE_D : Format.TWO_D,
            });
          }
        }
      }

      await this.showtimeRepository.save(showtimes);
      console.log(`  ✓ Created ${showtimes.length} showtimes`);
    } else {
      console.log('  ✓ Showtimes already exist, skipping');
    }

    console.log('\n--- DATABASE SEEDING COMPLETE ---\n');
  }
}
