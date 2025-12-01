import MercadoPagoConfig from 'mercadopago';

export const mpClientFactory = (accessToken: string) =>
  new MercadoPagoConfig({ accessToken });
