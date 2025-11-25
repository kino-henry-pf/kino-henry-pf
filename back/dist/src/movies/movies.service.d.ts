import Movie from './movie.entity';
import { MoviesRepository } from './movie.repository';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
export declare class MoviesService {
    private readonly moviesRepository;
    constructor(moviesRepository: MoviesRepository);
    findAll(): Promise<Movie[]>;
    findByTitle(title: string): Promise<Movie[]>;
    findById(id: string): Promise<Movie>;
    createMovie(dto: CreateMovieDto): Promise<Movie>;
    updateMovie(id: string, dto: UpdateMovieDto): Promise<Movie>;
    deleteMovie(id: string): Promise<void>;
    private notFound;
}
