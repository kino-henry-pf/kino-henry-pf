import { registerAs } from '@nestjs/config';

export interface EnvironmentVariables {
  port: number;
  origin: string;
  cloudName: string;
  cloudKey: string;
  cloudSecret: string;
}

export const environmentVariables = registerAs(
  'env',
  (): EnvironmentVariables => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
    origin: process.env.ORIGIN ?? 'http://localhost:5173',
    cloudName: process.env.CLOUD_NAME ?? '',
    cloudKey: process.env.CLOUD_KEY ?? '',
    cloudSecret: process.env.CLOUD_SECRET ?? '',
  }),
);
