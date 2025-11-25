import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Category {
  POPCORN = 'popcorn',                // Pochoclo / palomitas
  SOFT_DRINK = 'soft_drink',          // Gaseosas
  WATER = 'water',                    // Agua
  JUICE = 'juice',                    // Jugos embotellados
  CANDY = 'candy',                    // Golosinas (gomitas, caramelos)
  CHOCOLATE = 'chocolate',            // Chocolates
  GUM = 'gum',                        // Chicles
  NACHOS = 'nachos',                  // Nachos con queso / salsa
  HOTDOG = 'hotdog',                  // Perros calientes
  COMBO = 'combo',                    // Combinaciones (popcorn + bebida)
  OTHER = 'other'                     // Cualquier categoría adicional
}

@Entity()
export default class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({type:'varchar'})
    name: string

    @Column({type:'varchar'})
    image: string

    @Column({type:'text'})
    description: string

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({type:'enum', enum: Category, enumName: 'product_category_enum_v2'})
    category: Category
}
