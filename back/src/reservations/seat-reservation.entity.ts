import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Reservation from './reservation.entity';
import Seat from '../seats/seat.entity';

@Entity()
export default class SeatReservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Reservation, (reservation) => reservation.seats)
  reservation: Reservation;

  @Column()
  reservationId: string;

  @ManyToOne(() => Seat)
  seat: Seat;

  @Column()
  seatId: string;
}
