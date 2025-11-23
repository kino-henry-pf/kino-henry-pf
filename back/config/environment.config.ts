import { registerAs } from '@nestjs/config';

export interface EnvironmentVariables {
  port: number;
}

export const environmentVariables = registerAs(
  'env',
  (): EnvironmentVariables => ({
    port: parseInt(process.env.PORT ?? '3000', 10),
  }),
);
