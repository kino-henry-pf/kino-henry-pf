import Room from '../rooms/rooms.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Room, (room) => room.seats)
  room: Room;

  @Column()
  roomId: string;

  @Column({ length: 1 })
  row: string;

  @Column()
  number: number;

  @Column({ default: false })
  reserved: boolean;
}
