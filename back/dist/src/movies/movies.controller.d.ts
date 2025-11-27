import { MoviesService } from './movies.service';
import Movie from './movie.entity';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    findAllOrByTitle(title?: string): Promise<Movie[]>;
    findById(id: string): Promise<Movie>;
    createMovie(createMovieDto: CreateMovieDto, file?: Express.Multer.File): Promise<Movie>;
    updateMovie(id: string, updateMovieDto: UpdateMovieDto, file?: Express.Multer.File): Promise<Movie>;
    deleteMovie(id: string): Promise<void>;
}
