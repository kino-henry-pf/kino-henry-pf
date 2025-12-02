import { Body, Controller, Headers, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentPreferenceDto } from './DTOs/create-payment-preference.dto';
import type { MercadoPagoWebhookData } from './mercadopago-hook.type';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('preference')
  async createPreference(@Body() dto: CreatePaymentPreferenceDto) {
    return this.paymentsService.createPreference(dto);
  }

  @Post('webhook')
  async webhook(
    @Body() body: MercadoPagoWebhookData,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Headers('x-signature') _signature: string,
  ) {
    await this.paymentsService.handleWebhook(body);
    return { received: true };
  }
}
