import { Order } from '../../orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Review } from 'src/reviews/review.entity';

export enum ROLE {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity({ name: 'USERS' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  name: string | null;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Column({ type: 'varchar', nullable: true })
  address: string | null;

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
