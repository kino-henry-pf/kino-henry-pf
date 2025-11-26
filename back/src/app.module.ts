import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configSchema, ConfigType } from '../config/config.types';
import { typeOrmConfig } from '../config/database.config';
import { environmentVariables } from '../config/environment.config';
import { MoviesModule } from './movies/movies.module';
import { SeederModule } from './seeder/seeder.module';
import { UsersModule } from './users/users.module';
<<<<<<< HEAD
import { BranchsModule } from './branchs/branchs.module';
=======
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ShowtimesModule } from './showtimes/showtimes.module';
>>>>>>> fc4f9dfeba1d105739e1981e16ffbd935571d310

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environmentVariables, typeOrmConfig],
      envFilePath: '.env',
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
    MoviesModule,
    ProductsModule,
    SeederModule,
<<<<<<< HEAD
    BranchsModule,
=======
    AuthModule,
    ShowtimesModule,
>>>>>>> fc4f9dfeba1d105739e1981e16ffbd935571d310
  ],
  providers: [SeederModule],
})
export class AppModule {}
