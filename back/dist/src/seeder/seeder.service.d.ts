import Movie from '../movies/movie.entity';
import { Repository } from 'typeorm';
export declare class SeederService {
    private movieRepository;
    constructor(movieRepository: Repository<Movie>);
    seed(): Promise<void>;
}
