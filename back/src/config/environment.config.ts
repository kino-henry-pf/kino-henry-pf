import { registerAs } from '@nestjs/config';

export interface EnvironmentVariables {
  port: number;
  origin: string;
  cloudName: string;
  cloudKey: string;
  cloudSecret: string;
  jwt_secret: string;
  supabase_url: string;
  supabase_anon_key: string;
  subabase_service_role: string;
  auth_google_client_id: string;
  auth_google_client_secret: string;
  stripe_secret_key: string;
  stripe_webhook_secret: string;
  dev_back_url: string;
  dev_front_url: string;
  prod_back_url: string;
  prod_front_url: string;
  outlook_email: string;
  outlook_password: string;
  resend_api_key: string;
}

export const environmentVariables = registerAs(
  'env',
  (): EnvironmentVariables => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    origin: process.env.ORIGIN ?? 'http://localhost:5173',
    cloudName: process.env.CLOUD_NAME ?? '',
    cloudKey: process.env.CLOUD_KEY ?? '',
    cloudSecret: process.env.CLOUD_SECRET ?? '',
    jwt_secret: process.env.JWT_SECRET ?? '',
    supabase_url: process.env.SUPABASE_URL ?? '',
    supabase_anon_key: process.env.SUPABASE_ANON_KEY ?? '',
    subabase_service_role: process.env.SUPABASE_SERVICE_ROLE ?? '',
    auth_google_client_id: process.env.AUTH_GOOGLE_CLIENT_ID ?? '',
    auth_google_client_secret: process.env.AUTH_GOOGLE_CLIENT_SECRET ?? '',
    stripe_secret_key: process.env.STRIPE_SECRET_KEY ?? '',
    stripe_webhook_secret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    dev_back_url: process.env.DEV_BACK_URL ?? '',
    dev_front_url: process.env.DEV_FRONT_URL ?? '',
    prod_back_url: process.env.PROD_BACK_URL ?? '',
    prod_front_url: process.env.PROD_FRONT_URL ?? '',
    outlook_email: process.env.OUTLOOK_EMAIL ?? '',
    outlook_password: process.env.OUTLOOK_PASSWORD ?? '',
    resend_api_key: process.env.RESEND_API_KEY ?? '';
  }),
);
