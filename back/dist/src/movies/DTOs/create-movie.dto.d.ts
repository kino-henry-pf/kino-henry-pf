import { Genre } from '../movie.entity';
export default class CreateMovieDto {
    title: string;
    sinopsis: string;
    rating: number;
    genre: Genre;
    image: string;
    duration: number;
}
