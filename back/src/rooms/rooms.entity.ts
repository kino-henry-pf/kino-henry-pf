import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Room {
  @PrimaryGeneratedColumn('uuid') id: string;
}
