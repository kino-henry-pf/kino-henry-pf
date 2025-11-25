import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configSchema, ConfigType } from 'config/config.types';
import { typeOrmConfig } from 'config/database.config';
import { environmentVariables } from 'config/environment.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables, typeOrmConfig],
      envFilePath: '.env.example',
      validationSchema: configSchema,
      validationOptions: { abortEarly: true },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<ConfigType>) => {
        const dbConfig = configService.get('database', { infer: true });
        return { ...dbConfig };
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
