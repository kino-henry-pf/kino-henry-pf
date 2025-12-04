import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { STRIPE_CLIENT } from './stripe.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
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
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: `https://superlative-zabaione-f74f6b.netlify.app/success?orderId=${orderId}`,
      cancel_url: `https://superlative-zabaione-f74f6b.netlify.app/cancel?orderId=${orderId}`,
      metadata: {
        orderId: orderId,
      },
    });

    console.log('✅ Checkout session created:', session.id);
    console.log('📦 Order ID in metadata:', session.metadata.orderId);

    return { url: session.url };
  }

  async markOrderPaid(orderId: string) {
    const order = await this.orderRepo.findOneBy({ id: orderId });

    if (!order) {
      console.error(`❌ Order not found: ${orderId}`);
      return;
    }

    if (order.status === 'PAID') {
      console.log(`ℹ️  Order already marked as paid: ${orderId}`);
      return;
    }

    order.status = 'PAID';
    await this.orderRepo.save(order);

    console.log(`✅ Order ${orderId} successfully marked as PAID`);
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

      console.log('EVENT RECEIVED:', event.type);

      switch (event.type) {
        case 'checkout.session.completed': {
          const session = event.data.object;
          const orderId = session.metadata?.orderId;

          await this.markOrderPaid(orderId);
          break;
        }

        case 'payment_intent.succeeded': {
          const pi = event.data.object;
          console.log('PI SUCCEEDED:', pi.id);
          break;
        }

        default:
          console.log('Unhandled event', event.type);
      }
    } catch (err) {
      console.error('❌ Webhook signature verification failed');
      console.error(err);
      return; // ← IMPORTANT: STOP HERE
    }
  }
}
