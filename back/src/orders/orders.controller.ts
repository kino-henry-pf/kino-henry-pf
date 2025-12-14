import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import OrdersService from './orders.service';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { RolesGuard } from 'src/auth/guards/role-guard.guard';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/decorator/role.decorator';

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
  @UseGuards(AuthGuard)
  async create(@Body() dto: CreateOrderDto): Promise<Order> {
    return await this.ordersService.create(dto);
  }
}
