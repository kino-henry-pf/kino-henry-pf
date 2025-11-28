import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Movie, { Genre } from '../movies/movie.entity';
import { User } from '../users/entity/user.entity';
import Product, { Category } from '../products/product.entity';
import Showtime, { Format, Language } from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';
import { BranchProduct } from '../branchsproducts/branch_products.entity';

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
    @InjectRepository(BranchProduct)
    private bpRepository: Repository<BranchProduct>,
  ) {}

  private pickRandom<T>(array: T[], count: number): T[] {
    return [...array].sort(() => Math.random() - 0.5).slice(0, count);
  }

  async seed() {
    console.log('Starting Seeder...');

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
      savedBranches = await this.branchRepository.save(branchesData);
      console.log(`✓ Branches seeded (${savedBranches.length})`);
    } else {
      savedBranches = await this.branchRepository.find();
      console.log('⚠ Branches exist — skipping.');
    }

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
        {
          title: 'The Conjuring',
          synopsis: 'Paranormal investigators help a family.',
          rating: 4.2,
          genre: Genre.HORROR,
          image: 'https://theposterdb.com/api/assets/23525',
          duration: 112,
        },
        {
          title: 'Parasite',
          synopsis: 'A poor family infiltrates a rich home.',
          rating: 4.9,
          genre: Genre.DRAMA,
          image: 'https://theposterdb.com/api/assets/47915',
          duration: 132,
        },
        {
          title: 'Toy Story',
          synopsis: 'Toys come to life.',
          rating: 4.7,
          genre: Genre.ANIMATION,
          image: 'https://theposterdb.com/api/assets/457',
          duration: 81,
        },
        {
          title: 'The Notebook',
          synopsis: 'Romantic drama from the 1940s.',
          rating: 4.3,
          genre: Genre.ROMANCE,
          image: 'https://theposterdb.com/api/assets/167079',
          duration: 123,
        },
        {
          title: 'The Grand Budapest Hotel',
          synopsis: 'A concierge and his lobby boy.',
          rating: 4.6,
          genre: Genre.COMEDY,
          image: 'https://theposterdb.com/api/assets/54311',
          duration: 99,
        },
        {
          title: 'Saving Private Ryan',
          synopsis: 'WWII rescue mission.',
          rating: 4.8,
          genre: Genre.WAR,
          image: 'https://theposterdb.com/api/assets/34772',
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

      console.log(`✓ Movies seeded (${savedMovies.length})`);
      for (const movie of savedMovies) {
        const randomBranches = this.pickRandom(
          savedBranches,
          2 + Math.floor(Math.random() * 3),
        );
        movie.branches = randomBranches;
        await this.movieRepository.save(movie);
      }
    } else {
      savedMovies = await this.movieRepository.find({
        relations: ['branches'],
      });
      console.log('⚠ Movies exist — skipping.');
    }

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
        {
          name: 'Gomitas',
          image:
            'https://res.cloudinary.com/db9panarm/image/upload/v1764199215/gomitas_ombpyi.png',
          description: 'Gomitas de sabores',
          price: 40,
          category: Category.CANDY,
        },
        {
          name: 'Combo Pareja',
          image:
            'https://res.cloudinary.com/db9panarm/image/upload/v1764199210/combo_luzag1.png',
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
    } else {
      console.log('⚠ Products exist — skipping.');
    }

    const showtimeCount = await this.showtimeRepository.count();

    if (showtimeCount === 0) {
      const showtimesToCreate: Partial<Showtime>[] = [];

      for (const movie of savedMovies) {
        const branches = this.pickRandom(savedBranches, 2);

        for (const branch of branches) {
          showtimesToCreate.push({
            movieId: movie.id,
            roomId: crypto.randomUUID(),
            startTime: new Date(
              `2025-12-${String(1 + Math.floor(Math.random() * 10)).padStart(2, '0')}T${String(12 + Math.floor(Math.random() * 10)).padStart(2, '0')}:00:00.000Z`,
            ),
            language:
              Math.random() > 0.5 ? Language.DUBBED : Language.SUBTITLED,
            format: Math.random() > 0.5 ? Format.TWO_D : Format.THREE_D,
          });
        }
      }

      for (const st of showtimesToCreate)
        await this.showtimeRepository.save(st);
      console.log(`✓ Showtimes created (${showtimesToCreate.length})`);
    } else {
      console.log('⚠ Showtimes exist — skipping.');
    }

    const bpCount = await this.bpRepository.count();

    if (bpCount === 0) {
      const allBranches = await this.branchRepository.find();
      const allProducts = await this.productsRepository.find();

      const bpToInsert: Partial<BranchProduct>[] = [];

      for (const branch of allBranches) {
        const numProducts = 2 + Math.floor(Math.random() * 3);
        const selectedProducts = this.pickRandom(allProducts, numProducts);

        for (const product of selectedProducts) {
          bpToInsert.push({
            branchId: branch.id,
            productId: product.id,
            stock: 10 + Math.floor(Math.random() * 40),
          });
        }
      }

      await this.bpRepository.save(bpToInsert);
      console.log(`✓ Branch Products seeded (${bpToInsert.length})`);
    } else {
      console.log('⚠ Branch Products exist — skipping.');
    }

    console.log('Seeder Completed!');
  }
}
