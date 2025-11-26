import { Branch } from 'src/branchs/branch.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export enum Genre {
  ACTION = 'action',
  ADVENTURE = 'adventure',
  ANIMATION = 'animation',
  COMEDY = 'comedy',
  CRIME = 'crime',
  DRAMA = 'drama',
  FANTASY = 'fantasy',
  HORROR = 'horror',
  MYSTERY = 'mystery',
  ROMANCE = 'romance',
  SCI_FI = 'sci_fi',
  THRILLER = 'thriller',
  DOCUMENTARY = 'documentary',
  FAMILY = 'family',
  MUSICAL = 'musical',
  WAR = 'war',
  WESTERN = 'western',
  HISTORICAL = 'historical',
  SPORTS = 'sports',
}

@Entity()
export default class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column()
  sinopsis: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  rating: number;

  @Column({ type: 'enum', enum: Genre })
  genre: Genre;

  @Column()
  image: string;

  @Column()
  duration: number;

  @ManyToMany(()=> Branch, (branch) => branch.movies)
  branch: Branch[]
}
