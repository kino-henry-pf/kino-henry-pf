import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  RawBodyRequest,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';
import { AuthGuard } from '../auth/guards/auth-guard.guard';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  @UseGuards(AuthGuard)
  createCheckout(@Body('orderId') orderId: string) {
    return this.paymentsService.createCheckoutSession(orderId);
  }

  @Post('webhook')
  @UseGuards(AuthGuard)
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    await this.paymentsService.handleWebhook(req.rawBody, signature);
    return { received: true };
  }
}
