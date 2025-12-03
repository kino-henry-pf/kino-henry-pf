import { Body, Controller, Headers, Post, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Request } from 'express';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('checkout')
  createCheckout(@Body('orderId') orderId: string) {
    return this.paymentsService.createCheckoutSession(orderId);
  }

  @Post('webhook')
  async handleWebhook(
    @Req() req: Request,
    @Headers('stripe-signature') signature: string,
  ) {
    await this.paymentsService.handleWebhook(req.body, signature);
    return { recieved: true };
  }
}
