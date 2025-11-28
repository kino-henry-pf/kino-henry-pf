import { Branch } from '../../branchs/branch.entity';
import { User } from '../../users/entity/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetails } from './order-detail.entity';

@Entity({ name: 'ORDERS' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne(() => Reservation, (reservation) => reservation.order)
  // @JoinColumn({name: 'reservation_id'})
  // reservation: Reservation

  @ManyToOne(() => User, (user) => user.order)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Branch, (branch) => branch.order)
  @JoinColumn({ name: 'branch_id' })
  branch: Branch;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails: OrderDetails;
}
