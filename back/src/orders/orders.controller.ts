import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import OrdersService from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.findById(id);
  }

  @Get('/user/:userId')
  async findByUser(@Param('userId') userId: string): Promise<Order[]> {
    return await this.ordersService.findByUser(userId);
  }

  @Post()
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.create(dto);
  }
}
