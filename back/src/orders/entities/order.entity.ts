import { Branch } from '../../branchs/branch.entity';
import { User } from '../../users/entity/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderDetails from './orderDetails.entity';

@Entity({ name: 'ORDERS' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.order)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
  details: OrderDetails[];

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  total: number;
}
