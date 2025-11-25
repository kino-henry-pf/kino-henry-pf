import Movie from './movie.entity';
import { MoviesRepository } from './movie.repository';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
import CloudinaryService from 'src/cloudinary/cloudinary.service';
export declare class MoviesService {
    private readonly moviesRepository;
    private readonly cloudinaryService;
    constructor(moviesRepository: MoviesRepository, cloudinaryService: CloudinaryService);
    findAll(): Promise<Movie[]>;
    findByTitle(title: string): Promise<Movie[]>;
    findById(id: string): Promise<Movie>;
    createMovie(dto: CreateMovieDto, file?: Express.Multer.File): Promise<Movie>;
    updateMovie(id: string, dto: UpdateMovieDto, file?: Express.Multer.File): Promise<Movie>;
    deleteMovie(id: string): Promise<void>;
    private notFound;
}
