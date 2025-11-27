import { Format, Language } from '../showtimes.entity';
export declare class CreateShowtimeDto {
    movieId: string;
    branchId: string;
    roomId: string;
    startTime: string;
    language: Language;
    format: Format;
}
