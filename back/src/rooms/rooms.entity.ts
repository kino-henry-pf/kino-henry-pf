import Seat from '../seats/seat.entity';
import { Branch } from '../branchs/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Showtime from '../showtimes/showtimes.entity';

@Entity()
export default class Room {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Branch, (branch) => branch.rooms)
  @JoinColumn({ name: 'branchId' })
  branch: Branch;

  @Column()
  branchId: string;

  @OneToMany(() => Seat, (seat) => seat.room)
  seats: Seat[];

  @OneToMany(() => Showtime, (showtime) => showtime.room)
  showtimes: Showtime[];
}
