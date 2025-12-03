import { Module } from '@nestjs/common';
import OrdersService from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import OrderDetails from './entities/orderDetails.entity';
import Product from '../products/product.entity';
import { UsersModule } from '../users/users.module';
import { BranchsModule } from '../branchs/branchs.module';
import { ReservationsModule } from '../reservations/reservations.module';
import OrdersRepository from './orders.repository';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetails, Product]),
    UsersModule,
    BranchsModule,
    ReservationsModule,
    MailModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService],
})
export class OrdersModule {}
