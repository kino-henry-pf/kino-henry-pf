import { MercadoPagoConfig } from 'mercadopago';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '../config/config.types';
import { EnvironmentVariables } from '../config/environment.config';

export const MP_CLIENT = 'MP_CLIENT';

export const mpClientProvider = {
  provide: MP_CLIENT,
  useFactory: (configService: ConfigService<ConfigType>) => {
    const accessToken =
      configService.get<EnvironmentVariables>('env')?.mp_access_token;
    if (!accessToken) {
      throw new Error('MP_ACCESS_TOKEN is not defined in environment');
    }

    return new MercadoPagoConfig({
      accessToken,
    });
  },
  inject: [ConfigService],
};
