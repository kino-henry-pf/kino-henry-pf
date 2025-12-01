export interface MercadoPagoWebhookData {
  action?: string;
  type?: string;
  data?: {
    id?: string | number;
  };
}
