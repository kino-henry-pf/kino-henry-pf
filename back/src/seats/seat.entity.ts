import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Seat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  roomId: string;

  @Column({ length: 1 })
  row: string;

  @Column()
  number: number;
}
