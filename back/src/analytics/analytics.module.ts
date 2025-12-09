import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import OrderDetail from 'src/orders/entities/orderDetails.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([OrderDetail]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
