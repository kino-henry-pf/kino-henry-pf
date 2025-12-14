import { Order } from '../../orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Review } from '../../reviews/review.entity';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'USERS' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password: string;

  @Column({ type: 'varchar', nullable: true })
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];

  @Exclude()
  @Column({ type: 'enum', enum: ROLE, default: ROLE.USER })
  role: ROLE;

  @Exclude()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @Column({ type: 'varchar', nullable: true })
  providerId: string;

  @Column({ type: 'varchar', nullable: true })
  provider: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
