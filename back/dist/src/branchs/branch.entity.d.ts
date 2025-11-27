import Movie from '../movies/movie.entity';
export declare class Branch {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    googlePlaceId: string;
    movies: Movie[];
}
