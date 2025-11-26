import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinColumn, JoinTable } from 'typeorm';
import Movie from 'src/movies/movie.entity';

@Entity()
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar'})
  name: string;

  @Column({ type: 'varchar'})
  address: string;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // ejemplo: -34.603722
  latitude: number;

  @Column({ type: 'decimal', precision: 9, scale: 6 }) // ejemplo: -58.381592
  longitude: number;

  @Column({ type: 'varchar', nullable: true })
  googlePlaceId: string;

  @ManyToMany(() => Movie, (movie) => movie.branch)
  @JoinTable({name: 'BRANCH_MOVIES'})
  movies: Movie[];
}