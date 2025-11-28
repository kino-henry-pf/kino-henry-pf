import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity({name: 'ORDERS-DETAILS'})
export class OrderDetails{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @OneToOne(() => Order, (order) => order.orderDetails)
    @JoinColumn({ name: 'order_id' })
    order: Order;
}