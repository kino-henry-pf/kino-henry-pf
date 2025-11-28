import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({
  name: 'USERS',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[]
  

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @Exclude()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
