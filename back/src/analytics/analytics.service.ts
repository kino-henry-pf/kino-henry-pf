import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Repository } from 'typeorm';
import OrderDetail from 'src/orders/entities/orderDetails.entity';
import Room from 'src/rooms/rooms.entity';

interface RoomOccupancyRaw {
  roomId: string;
  roomName: string;
  branchName: string;
  totalSeats: string | number;
  soldSeats: string | number;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepo: Repository<OrderDetail>,

    @InjectRepository(Room)
    private readonly roomRepo: Repository<Room>,
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

  async getRoomOccupancy() {
    const result = await this.roomRepo
      .createQueryBuilder('room')
      .leftJoin('room.branch', 'branch')
      .leftJoin('room.seats', 'seat')
      .leftJoin('seat_reservation', 'sr', 'sr.seatId = seat.id')
      .leftJoin('order_detail', 'od', 'od.seatReservationId = sr.id')
      .leftJoin('ORDERS', 'o', 'o.id = od.orderId AND o.status = :status', {
        status: 'PAID',
      })
      .select('room.id', 'roomId')
      .addSelect('room.name', 'roomName')
      .addSelect('branch.name', 'branchName')
      .addSelect('COUNT(seat.id)', 'totalSeats')
      .addSelect('COUNT(sr.id)', 'soldSeats')
      .groupBy('room.id')
      .addGroupBy('room.name')
      .addGroupBy('branch.name')
      .getRawMany<RoomOccupancyRaw>();

    return result.map((r) => {
      const totalSeats = Number(r.totalSeats ?? 0);
      const sold = Number(r.soldSeats ?? 0);

      return {
        roomId: r.roomId,
        roomName: r.roomName,
        branch: r.branchName,
        totalSeats,
        sold,
        summary: `${sold}/${totalSeats}`,
      };
    });
  }
}
