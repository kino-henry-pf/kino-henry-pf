import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import Movie from '../movies/movie.entity';
import { BranchProduct } from 'src/branchsproducts/branch_products.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  address: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // ejemplo: -34.603722
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // ejemplo: -58.381592
  longitude: number;

  @Column({ type: 'varchar', nullable: true })
  googlePlaceId: string;

  @ManyToMany(() => Movie, (movie) => movie.branches)
  @JoinTable({ name: 'branch_movies' })
  movies: Movie[];

  @OneToMany(() => BranchProduct, (branchProduct) => branchProduct.branch)
  branchProducts: BranchProduct[];
}
