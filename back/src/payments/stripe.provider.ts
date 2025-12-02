import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

export const STRIPE_CLIENT = 'STRIPE_CLIENT';

export const stripeClientProvider = {
  provide: STRIPE_CLIENT,
  useFactory: (config: ConfigService) => {
    const key = config.get<string>('env.stripe_secret_key');
    if (!key) {
      throw new Error('Missing STRIPE_SECRET_KEY');
    }

    return new Stripe(key, {
      apiVersion: null,
    });
  },
  inject: [ConfigService],
};
