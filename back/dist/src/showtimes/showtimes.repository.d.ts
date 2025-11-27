import Showtime from './showtimes.entity';
import { Repository } from 'typeorm';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
export default class ShowtimesRepository {
    private readonly showtimesRepository;
    constructor(showtimesRepository: Repository<Showtime>);
    findAll(): Promise<Showtime[]>;
    findById(id: string): Promise<Showtime | null>;
    createMovie(dto: CreateShowtimeDto): Promise<Showtime>;
    deleteShowtime(id: string): Promise<Showtime | null>;
    private findOneOrNull;
}
