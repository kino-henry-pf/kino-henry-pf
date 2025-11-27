import Movie from '../movies/movie.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entity/user.entity';
import Product from '../products/product.entity';
import Showtime from '../showtimes/showtimes.entity';
export declare class SeederService {
    private movieRepository;
    private usersRepository;
    private productsRepository;
    private showtimeRepository;
    constructor(movieRepository: Repository<Movie>, usersRepository: Repository<User>, productsRepository: Repository<Product>, showtimeRepository: Repository<Showtime>);
    seed(): Promise<void>;
}
