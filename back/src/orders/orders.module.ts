import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { Branch } from '../branchs/branch.entity';
import { OrderDetails } from './entities/order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Branch, OrderDetails])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
