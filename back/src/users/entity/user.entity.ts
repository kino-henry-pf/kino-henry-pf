import { Order } from 'src/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column()
  roles: string;

  // @OneToMany(@OneToMany(() => Orders, (order) => order.user))
  // order: Orders[]

  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @Exclude()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
