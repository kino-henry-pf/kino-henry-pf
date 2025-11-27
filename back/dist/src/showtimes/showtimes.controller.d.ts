import { ShowtimesService } from './showtimes.service';
import Showtime from './showtimes.entity';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
export declare class ShowtimesController {
    private readonly showtimesService;
    constructor(showtimesService: ShowtimesService);
    findAll(): Promise<Showtime[]>;
    findById(id: string): Promise<Showtime>;
    createShowtime(dto: CreateShowtimeDto): Promise<Showtime>;
    deleteShowTime(id: string): Promise<void>;
}
