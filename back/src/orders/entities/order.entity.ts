import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import OrderDetail from './orderDetails.entity';
import { User } from '../../users/entity/user.entity';
import { Branch } from '../../branchs/branch.entity';

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

  @OneToMany(() => OrderDetail, (orderDetails) => orderDetails.order)
  details: OrderDetail[];

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  total: number;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: string;
}
