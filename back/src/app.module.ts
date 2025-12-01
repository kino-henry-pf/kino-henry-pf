import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configSchema, ConfigType } from './config/config.types';
import { typeOrmConfig } from './config/database.config';
import { environmentVariables } from './config/environment.config';
import { MoviesModule } from './movies/movies.module';
import { SeederModule } from './seeder/seeder.module';
import { UsersModule } from './users/users.module';
import { BranchsModule } from './branchs/branchs.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
import { JwtModule } from '@nestjs/jwt';
import { OrdersModule } from './orders/orders.module';
import { BranchsproductsModule } from './branchsproducts/branchsproducts.module';
import { SeatsModule } from './seats/seats.module';
import { ReservationsModule } from './reservations/reservations.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [environmentVariables, typeOrmConfig],
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
    JwtModule.registerAsync({
      global: true,
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
      }),
    }),
    UsersModule,
    MoviesModule,
    ProductsModule,
    SeederModule,
    BranchsModule,
    AuthModule,
    ShowtimesModule,
    OrdersModule,
    BranchsproductsModule,
    SeatsModule,
    ReservationsModule,
    PaymentsModule,
  ],
  providers: [SeederModule],
})
export class AppModule {}
