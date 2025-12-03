import {
  Body,
  Controller,
  Headers,
  Post,
  Req,
  RawBodyRequest,
} from '@nestjs/common';
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
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('RAWBODY?', req.rawBody);
    console.log('TYPE OF RAWBODY?', typeof req.rawBody);
    console.log('BODY?', req.body);
    console.log('HEADERS RECEIVED:', req.headers);

    await this.paymentsService.handleWebhook(req.rawBody, signature);
    return { received: true };
  }
}
