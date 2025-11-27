import ShowtimesRepository from './showtimes.repository';
import Showtime from './showtimes.entity';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
import { MoviesService } from '../movies/movies.service';
export declare class ShowtimesService {
    private readonly showtimesRepository;
    private readonly moviesService;
    constructor(showtimesRepository: ShowtimesRepository, moviesService: MoviesService);
    findAll(): Promise<Showtime[]>;
    findById(id: string): Promise<Showtime>;
    createShowtime(dto: CreateShowtimeDto): Promise<Showtime>;
    deleteShowTime(id: string): Promise<void>;
    private notFound;
}
