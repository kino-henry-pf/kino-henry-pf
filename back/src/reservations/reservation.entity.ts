import Showtime from '../showtimes/showtimes.entity';
import { User } from '../users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import SeatReservation from './seat-reservation.entity';

export enum ReservationStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  CONFIRMED = 'confirmed',
}

@Entity()
export default class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Showtime)
  showtime: Showtime;

  @Column()
  showtimeId: string;

  @OneToMany(
    () => SeatReservation,
    (seatReservation) => seatReservation.reservation,
    { cascade: true },
  )
  seats: SeatReservation[];

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    type: 'enum',
    enum: ReservationStatus,
    default: ReservationStatus.PENDING,
  })
  status: ReservationStatus;
}
