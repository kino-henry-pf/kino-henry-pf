import Movie from 'src/movies/movie.entity';
import { User } from 'src/users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  review: string;

  @Column({ type: 'numeric', precision: 2, scale: 1 })
  rating: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Movie, (movie) => movie.reviews, {
    onDelete: 'CASCADE',
  })
  movie: Movie;
}
