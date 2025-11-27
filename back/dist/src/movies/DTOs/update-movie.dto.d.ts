import { Genre } from '../movie.entity';
export declare class UpdateMovieDto {
    title?: string;
    sinopsis?: string;
    rating?: number;
    genre?: Genre;
    image?: string;
    duration?: number;
}
