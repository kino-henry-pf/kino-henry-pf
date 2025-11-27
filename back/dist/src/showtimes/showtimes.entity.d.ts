import Movie from '../movies/movie.entity';
export declare enum Language {
    DUBBED = "dubbed",
    SUBTITLED = "subtitled"
}
export declare enum Format {
    TWO_D = "2D",
    THREE_D = "3D"
}
export default class Showtime {
    id: string;
    movie: Movie;
    movieId: string;
    branchId: string;
    roomId: string;
    startTime: Date;
    language: Language;
    format: Format;
}
