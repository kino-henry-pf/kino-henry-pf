import { Module } from '@nestjs/common';
import OrdersService from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import OrderDetails from './entities/orderDetails.entity';
import Product from 'src/products/product.entity';
import { UsersModule } from 'src/users/users.module';
import { BranchsModule } from 'src/branchs/branchs.module';
import { ReservationsModule } from 'src/reservations/reservations.module';
import OrdersRepository from './orders.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetails, Product]),
    UsersModule,
    BranchsModule,
    ReservationsModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
