import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import OrdersRepository from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export default class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.ordersRepository.create(dto);
    if (!newOrder) throw new BadRequestException(`Order could not be created`);
    return newOrder;
  }

  async findById(id: string): Promise<Order> {
    const order = await this.ordersRepository.findById(id);
    if (!order)
      throw new NotFoundException(`No order with an id of ${id} found.`);
    return order;
  }
  async findByUser(userId: string): Promise<Order[]> {
    return await this.ordersRepository.findByUser(userId);
  }
}
