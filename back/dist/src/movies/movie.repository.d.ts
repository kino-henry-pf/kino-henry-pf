import Movie from './movie.entity';
import { Repository } from 'typeorm';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
export declare class MoviesRepository {
    private readonly moviesRepository;
    constructor(moviesRepository: Repository<Movie>);
    findAll(): Promise<Movie[]>;
    findByTitle(title: string): Promise<Movie[]>;
    findById(id: string): Promise<Movie | null>;
    createMovie(dto: CreateMovieDto): Promise<Movie>;
    updateMovie(id: string, dto: UpdateMovieDto): Promise<Movie | null>;
    deleteMovie(id: string): Promise<Movie | null>;
    private findOneOrNull;
}
