import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configSchema } from 'config/config.types';
import { environmentVariables } from 'config/environment.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables],
      envFilePath: '.env',
      validationSchema: configSchema,
      validationOptions: { abortEarly: true },
    }),
  ],
})
export class AppModule {}
