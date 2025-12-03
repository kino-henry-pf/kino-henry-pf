import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { STRIPE_CLIENT } from './stripe.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    @InjectRepository(Order) private readonly orderRepo: Repository<Order>,
    private config: ConfigService,
  ) {}

  async createCheckoutSession(orderId: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['details', 'details.product', 'details.seatReservation'],
    });
    if (!order) throw new NotFoundException('Order not found.');

    const lineItems = order.details.map((item) => ({
      price_data: {
        currency: 'mxn',
        product_data: {
          name: item.product ? item.product.name : 'Movie Seat Reservation',
        },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity ?? 1,
    }));

    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      success_url: `https://your-frontend.com/success?orderId=${orderId}`,
      cancel_url: `https://your-frontend.com/cancel?orderId=${orderId}`,
      metadata: { orderId },
    });
    return { url: session.url };
  }

  async markOrderPaid(orderId: string) {
    const order = await this.orderRepo.findOneBy({ id: orderId });
    if (!order) return;

    order.status = 'PAID';

    await this.orderRepo.save(order);
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const endpointSecret: string = this.config.get('env.stripe_webhook_secret');
    let event: Stripe.Event;

    try {
      event = this.stripe.webhooks.constructEvent(
        rawBody,
        signature,
        endpointSecret,
      );
    } catch (error) {
      console.error('Webhook signature verification failed', error);
      throw error;
    }

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const orderId = session.metadata?.orderId;
        if (orderId) {
          await this.markOrderPaid(orderId);
        }
        break;
      }

      case 'checkout.session.async_payment_failed':
        console.log('❌ Async payment failed');
        break;

      case 'checkout.session.async_payment_succeeded':
        console.log('✅ Async payment succeeded');
        break;

      case 'checkout.session.expired':
        console.log('⌛ Checkout session expired');
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }
}
