import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';
import Product from '../../products/product.entity';
import SeatReservation from '../../reservations/seat-reservation.entity';

@Entity()
export default class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Order, (order) => order.details)
  order: Order;

  @Column()
  orderId: string;

  @ManyToOne(() => Product, { nullable: true })
  product: Product;

  @Column({ nullable: true })
  productId: string;

  @ManyToOne(() => SeatReservation, { nullable: true })
  seatReservation: SeatReservation;

  @Column({ nullable: true })
  seatReservationId: string;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  price: number;
}
