import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import OrdersRepository from './orders.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import MailService from '../mail/mail.service';

@Injectable()
export default class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly mailService: MailService,
  ) {}

  async create(dto: CreateOrderDto): Promise<Order> {
    const newOrder = await this.ordersRepository.create(dto);
    if (!newOrder) {
      throw new BadRequestException(`Order could not be created`);
    }

    // this.ordersRepository['usersService']
    //   .findById(dto.userId)
    //   .then((user) => {
    //     return this.mailService.sendOrderEmail(
    //       user.email,
    //       newOrder.id,
    //       newOrder.total,
    //     );
    //   })
    //   .catch((err) => {
    //     console.error('Email error:', err);
    //   });

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
