import Movie from '../movies/movie.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entity/user.entity';
export declare class SeederService {
    private movieRepository;
    private usersRepository;
    constructor(movieRepository: Repository<Movie>, usersRepository: Repository<User>);
    seed(): Promise<void>;
}
