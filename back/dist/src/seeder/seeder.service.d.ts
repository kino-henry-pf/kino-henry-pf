import { Repository } from 'typeorm';
import Movie from '../movies/movie.entity';
import { User } from '../users/entity/user.entity';
import Product from '../products/product.entity';
import Showtime from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';
export declare class SeederService {
    private movieRepository;
    private usersRepository;
    private productsRepository;
    private showtimeRepository;
    private branchRepository;
    constructor(movieRepository: Repository<Movie>, usersRepository: Repository<User>, productsRepository: Repository<Product>, showtimeRepository: Repository<Showtime>, branchRepository: Repository<Branch>);
    private pickRandom;
    seed(): Promise<void>;
}
