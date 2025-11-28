import { Exclude } from 'class-transformer';
import Movie from '../movies/movie.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Room from 'src/rooms/rooms.entity';

export enum Language {
  DUBBED = 'dubbed',
  SUBTITLED = 'subtitled',
}

export enum Format {
  TWO_D = '2D',
  THREE_D = '3D',
}

@Entity('showtimes')
export default class Showtime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Movie, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Exclude()
  @Column()
  movieId: string;

  @ManyToOne(() => Room, (room) => room.showtimes)
  @JoinColumn({ name: 'roomId' })
  room: Room;

  @Column()
  roomId: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'enum', enum: Language })
  language: Language;

  @Column({ type: 'enum', enum: Format })
  format: Format;
}
