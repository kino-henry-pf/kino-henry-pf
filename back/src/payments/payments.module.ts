import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Payment from './payment.entity';
import { Order } from '../orders/entities/order.entity';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';

import { MP_CLIENT, mpClientProvider } from './mercadopago.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Payment, Order])],
  controllers: [PaymentsController],
  providers: [mpClientProvider, PaymentsService],
  exports: [PaymentsService, MP_CLIENT],
})
export class PaymentsModule {}
