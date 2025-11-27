import Movie from '../movies/movie.entity';
import { BranchProduct } from './branch_products.entity';
export declare class Branch {
    id: string;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    googlePlaceId: string;
    movies: Movie[];
    branchProducts: BranchProduct[];
}
