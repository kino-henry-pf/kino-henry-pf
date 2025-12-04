import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Movie, { Genre } from '../movies/movie.entity';
import { User } from '../users/entity/user.entity';
import Product, { Category } from '../products/product.entity';
import Showtime, { Format, Language } from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';
import { BranchProduct } from '../branchsproducts/branch_products.entity';
import { RoomsService } from '../rooms/rooms.service';
import Room from '../rooms/rooms.entity';

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

  private pickRandom<T>(array: T[], count: number): T[] {
    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
  }

  async seed() {
    console.log('--- STARTING DATABASE SEEDER ---');

    // BRANCHES
    console.log('\n> Seeding Branches...');
    const branchCount = await this.branchRepository.count();
    let savedBranches: Branch[];

    if (branchCount === 0) {
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
      savedBranches = await this.branchRepository.find();
      console.log('  ✓ Branches already exist, skipping');
    }

    // ROOMS
    console.log('\n> Seeding Rooms...');
    const roomCount = await this.roomRepository.count();
    let savedRooms: Room[];

    if (roomCount === 0) {
      const roomsToCreate: Room[] = [];

      for (const branch of savedBranches) {
        for (let i = 1; i <= 3; i++) {
          const room = await this.roomsService.createRoom({
            name: `Room ${i}`,
            branchId: branch.id,
          });
          roomsToCreate.push(room);
        }
      }

      savedRooms = roomsToCreate;
      console.log(`  ✓ Created ${savedRooms.length} rooms`);
    } else {
      savedRooms = await this.roomRepository.find();
      console.log('  ✓ Rooms already exist, skipping');
    }

    // MOVIES
    console.log('\n> Seeding Movies...');
    const movieCount = await this.movieRepository.count();
    let savedMovies: Movie[];

    if (movieCount === 0) {
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
      ];

      savedMovies = [];

      for (const m of moviesData) {
        const exists = await this.movieRepository.findOne({
          where: { title: m.title },
        });
        savedMovies.push(exists ?? (await this.movieRepository.save(m)));
      }

      console.log(`  ✓ Created ${savedMovies.length} movies`);

      // Link all movies to all branches
      for (const movie of savedMovies) {
        movie.branches = savedBranches;
        await this.movieRepository.save(movie);
      }

      console.log('  ✓ Linked all movies to all branches');
    } else {
      savedMovies = await this.movieRepository.find({
        relations: ['branches'],
      });
      console.log('  ✓ Movies already exist, skipping');
    }

    // PRODUCTS
    console.log('\n> Seeding Products...');
    const productCount = await this.productsRepository.count();

    if (productCount === 0) {
      const productsData: Partial<Product>[] = [
        {
          name: 'Palomitas Clásicas',
          image:
            'https://res.cloudinary.com/db9panarm/image/upload/v1764199212/palomitas_mnsmvw.png',
          description: 'Clasicas con mantequilla',
          price: 75,
          category: Category.POPCORN,
        },
        {
          name: 'Refresco Grande',
          image:
            'https://res.cloudinary.com/db9panarm/image/upload/v1764199211/refresco_jtef2k.png',
          description: '1 litro bien frio',
          price: 60,
          category: Category.SOFT_DRINK,
        },
        {
          name: 'Nachos con Queso',
          image:
            'https://res.cloudinary.com/db9panarm/image/upload/v1764199214/nachos_qpoj94.png',
          description: 'Nachos calientes con queso',
          price: 85,
          category: Category.NACHOS,
        },
      ];

      for (const p of productsData) {
        const exists = await this.productsRepository.findOne({
          where: { name: p.name },
        });
        if (!exists) await this.productsRepository.save(p);
      }

      console.log('  ✓ Products created');
    }

    // SHOWTIMES (Generate for ALL movies in ALL branches)
    console.log('\n> Seeding Showtimes...');
    const showtimeCount = await this.showtimeRepository.count();

    if (showtimeCount === 0) {
      const showtimesToCreate: Partial<Showtime>[] = [];

      for (const movie of savedMovies) {
        for (const branch of savedBranches) {
          const roomsForBranch = savedRooms.filter(
            (r) => r.branchId === branch.id,
          );

          // Create 2–3 showtimes per movie per branch
          const numShowtimes = 2 + Math.floor(Math.random() * 2);

          for (let i = 0; i < numShowtimes; i++) {
            const selectedRoom = this.pickRandom(roomsForBranch, 1)[0];

            showtimesToCreate.push({
              movieId: movie.id,
              roomId: selectedRoom.id,
              startTime: new Date(
                `2025-12-${String(1 + Math.floor(Math.random() * 10)).padStart(
                  2,
                  '0',
                )}T${String(12 + Math.floor(Math.random() * 8)).padStart(
                  2,
                  '0',
                )}:00:00.000Z`,
              ),
              language:
                Math.random() > 0.5 ? Language.DUBBED : Language.SUBTITLED,
              format: Math.random() > 0.5 ? Format.TWO_D : Format.THREE_D,
            });
          }
        }
      }

      await this.showtimeRepository.save(showtimesToCreate);
      console.log(`  ✓ Created ${showtimesToCreate.length} showtimes`);
    } else {
      console.log('  ✓ Showtimes already exist, skipping');
    }

    console.log('\n--- DATABASE SEEDING COMPLETE ---');
  }
}
