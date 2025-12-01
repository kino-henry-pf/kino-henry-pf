import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../orders/entities/order.entity';
import Payment from './payment.entity';
import { CreatePaymentPreferenceDto } from './DTOs/create-payment-preference.dto';

import { MP_CLIENT } from './mercadopago.provider';
import {
  MercadoPagoConfig,
  Preference,
  Payment as MPPayment,
} from 'mercadopago';

import { MercadoPagoWebhookData } from './mercadopago-hook.type';

// Correct SDK response typing
interface MpPaymentBody {
  id: number;
  external_reference: string;
  status: string;
  transaction_amount: number;
}

interface MpPaymentResponse {
  body: MpPaymentBody;
}

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentsRepository: Repository<Payment>,

    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,

    @Inject(MP_CLIENT)
    private readonly mpClient: MercadoPagoConfig,
  ) {}

  async createPreference(dto: CreatePaymentPreferenceDto) {
    const order = await this.ordersRepository.findOne({
      where: { id: dto.orderId },
      relations: ['details', 'details.product', 'details.seatReservation'],
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${dto.orderId} not found`);
    }

    if (!order.details || order.details.length === 0) {
      throw new NotFoundException(
        `Order ${dto.orderId} has no details to charge`,
      );
    }

    const items = order.details.map((detail) => ({
      id: detail.productId ?? detail.seatReservationId ?? 'ticket',
      title: detail.productId
        ? (detail.product?.name ?? 'Product')
        : 'Movie ticket',
      quantity: detail.quantity ?? 1,
      currency_id: 'MXN',
      unit_price: Number(detail.price ?? 0),
    }));

    const preferenceClient = new Preference(this.mpClient);

    const preference = await preferenceClient.create({
      body: {
        items,
        external_reference: order.id,
        back_urls: {
          success: 'http://localhost:3001/payment/success',
          failure: 'http://localhost:3001/payment/failure',
          pending: 'http://localhost:3001/payment/pending',
        },
        notification_url: 'https://your-ngrok-url.ngrok.io/payments/webhook',
      },
    });

    return {
      initPoint: preference.init_point,
      id: preference.id,
    };
  }

  async handleWebhook(body: MercadoPagoWebhookData): Promise<void> {
    const paymentId = body.data?.id;
    if (!paymentId) return;

    const paymentClient = new MPPayment(this.mpClient);

    // SDK typing is wrong — so we receive unknown and then validate
    const rawResponse: unknown = await paymentClient.get({
      id: String(paymentId),
    });

    if (!this.isMpPaymentResponse(rawResponse)) {
      return; // invalid shape — stop safely
    }

    const mpPayment = rawResponse.body;

    const order = await this.ordersRepository.findOne({
      where: { id: mpPayment.external_reference },
    });

    if (!order) return;

    // Save payment entry
    const paymentEntry = this.paymentsRepository.create({
      orderId: order.id,
      mpPaymentId: String(mpPayment.id),
      mpStatus: mpPayment.status,
      amount: mpPayment.transaction_amount,
    });

    await this.paymentsRepository.save(paymentEntry);

    // Update order status
    const approvedStatuses = ['approved', 'accredited'];

    if (approvedStatuses.includes(mpPayment.status)) {
      if (order.status !== 'PAID') {
        order.status = 'PAID';
        await this.ordersRepository.save(order);
      }
    } else if (mpPayment.status === 'rejected') {
      order.status = 'FAILED';
      await this.ordersRepository.save(order);
    }
  }

  // ---- TYPE GUARD (safe narrowing, no any, eslint clean) ----
  private isMpPaymentResponse(obj: unknown): obj is MpPaymentResponse {
    if (typeof obj !== 'object' || obj === null) return false;

    const res = obj as Record<string, unknown>;

    if (typeof res.body !== 'object' || res.body === null) return false;

    const body = res.body as Record<string, unknown>;

    return (
      'id' in body &&
      'external_reference' in body &&
      'status' in body &&
      'transaction_amount' in body
    );
  }
}
