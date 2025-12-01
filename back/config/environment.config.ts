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
  }),
);
