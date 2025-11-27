import { BranchProduct } from 'src/branchsproducts/branch_products.entity';
export declare enum Category {
    POPCORN = "popcorn",
    SOFT_DRINK = "soft_drink",
    WATER = "water",
    JUICE = "juice",
    CANDY = "candy",
    CHOCOLATE = "chocolate",
    GUM = "gum",
    NACHOS = "nachos",
    HOTDOG = "hotdog",
    COMBO = "combo",
    OTHER = "other"
}
export default class Product {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    category: Category;
    branchProducts: BranchProduct[];
}
