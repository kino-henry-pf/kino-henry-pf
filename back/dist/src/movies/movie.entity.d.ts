import { Branch } from 'src/branchs/branch.entity';
export declare enum Genre {
    ACTION = "action",
    ADVENTURE = "adventure",
    ANIMATION = "animation",
    COMEDY = "comedy",
    CRIME = "crime",
    DRAMA = "drama",
    FANTASY = "fantasy",
    HORROR = "horror",
    MYSTERY = "mystery",
    ROMANCE = "romance",
    SCI_FI = "sci_fi",
    THRILLER = "thriller",
    DOCUMENTARY = "documentary",
    FAMILY = "family",
    MUSICAL = "musical",
    WAR = "war",
    WESTERN = "western",
    HISTORICAL = "historical",
    SPORTS = "sports"
}
export default class Movie {
    id: string;
    title: string;
    sinopsis: string;
    rating: number;
    genre: Genre;
    image: string;
    duration: number;
    branches: Branch[];
}
