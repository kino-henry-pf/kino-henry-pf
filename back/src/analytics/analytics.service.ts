import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import OrderDetail from 'src/orders/entities/orderDetails.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepo: Repository<OrderDetail>,
  ) {}

  async getTotalRevenue(): Promise<number> {
    const result = await this.orderRepo
      .createQueryBuilder('order')
      .select('COALESCE(SUM(order.total), 0)', 'total')
      .where('order.status = :status', { status: 'PAID' })
      .getRawOne<{ total: string }>();

    const total = result?.total ?? '0';
    return Number(total);
  }

  async getTotalTickets(): Promise<{ totalTickets: number }> {
    const result = await this.orderDetailsRepo
      .createQueryBuilder('detail')
      .innerJoin('detail.order', 'order')
      .where('order.status = :status', { status: 'PAID' })
      .andWhere('detail.seatReservationId IS NOT NULL')
      .select('COALESCE(SUM(detail.quantity), 0)', 'totalTickets')
      .getRawOne<{ totalTickets: string }>();

    return {
      totalTickets: Number(result?.totalTickets ?? 0),
    };
  }

  async getTotalProductsSold(): Promise<{ totalProductsSold: number }> {
    const result = await this.orderDetailsRepo
      .createQueryBuilder('detail')
      .innerJoin('detail.order', 'order')
      .where('order.status = :status', { status: 'PAID' })
      .andWhere('detail.productId IS NOT NULL')
      .select('COALESCE(SUM(detail.quantity), 0)', 'totalProductsSold')
      .getRawOne<{ totalProductsSold: string }>();

    return {
      totalProductsSold: Number(result?.totalProductsSold ?? 0),
    };
  }
}
