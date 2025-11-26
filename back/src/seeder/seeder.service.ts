import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Movie, { Genre } from '../movies/movie.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    @InjectRepository(User) private usersRepository: Repository<User>
  ) {}

  async seed() {
    const movies: Partial<Movie>[] = [
      {
        title: 'Inception',
        sinopsis:
          'A thief who uses dream-sharing technology is tasked with planting an idea into a target’s subconscious.',
        rating: 4.8,
        genre: Genre.SCI_FI,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 148,
      },
      {
        title: 'The Dark Knight',
        sinopsis:
          'Batman faces the Joker, a criminal mastermind who wants to plunge Gotham into chaos.',
        rating: 4.9,
        genre: Genre.ACTION,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 152,
      },
      {
        title: 'La La Land',
        sinopsis:
          'A jazz musician and an aspiring actress fall in love while pursuing their dreams.',
        rating: 4.5,
        genre: Genre.MUSICAL,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 128,
      },
      {
        title: 'Interstellar',
        sinopsis:
          'A team of explorers travel through a wormhole in search of a new home for humanity.',
        rating: 4.7,
        genre: Genre.SCI_FI,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 169,
      },
      {
        title: 'The Conjuring',
        sinopsis:
          'Paranormal investigators help a family terrorized by a dark entity.',
        rating: 4.2,
        genre: Genre.HORROR,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 112,
      },
      {
        title: 'Parasite',
        sinopsis:
          'A poor family schemes to infiltrate a wealthy household with unexpected consequences.',
        rating: 4.9,
        genre: Genre.DRAMA,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 132,
      },
      {
        title: 'Toy Story',
        sinopsis:
          'A group of toys come to life and navigate friendship when a new toy arrives.',
        rating: 4.7,
        genre: Genre.ANIMATION,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 81,
      },
      {
        title: 'The Notebook',
        sinopsis:
          'A romantic drama about a young couple who fall deeply in love in the 1940s.',
        rating: 4.3,
        genre: Genre.ROMANCE,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 123,
      },
      {
        title: 'The Grand Budapest Hotel',
        sinopsis:
          'A quirky concierge and his lobby boy become entangled in a murder mystery.',
        rating: 4.6,
        genre: Genre.COMEDY,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 99,
      },
      {
        title: 'Saving Private Ryan',
        sinopsis:
          'A group of soldiers embark on a mission to rescue a paratrooper during World War II.',
        rating: 4.8,
        genre: Genre.WAR,
        image: 'https://fakeimg.com/movie.jpg',
        duration: 169,
      },
    ];
    for (const movieData of movies) {
      const exists = await this.movieRepository.findOne({
        where: { title: movieData.title },
      });
      if (!exists) await this.movieRepository.save(movieData);
      console.log("Movies seeded.")
    }
    const users: Partial<User>[] = [
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
]
    for (const userData of users) {
      const exists = await this.usersRepository.findOne({
        where: { email: userData.email },
      });
      if (!exists) await this.usersRepository.save(userData);
      console.log("Users seeded.")
      }
  }
}