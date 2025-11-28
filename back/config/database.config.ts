import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Movie from '../src/movies/movie.entity';
import { User } from '../src/users/entity/user.entity';
import Product from '../src/products/product.entity';
import Showtimes from '../src/showtimes/showtimes.entity';
import { Branch } from '../src/branchs/branch.entity';
import { BranchProduct } from '../src/branchsproducts/branch_products.entity';
import { Order } from '../src/orders/entities/order.entity';
import { OrderDetails } from '../src/orders/entities/order-detail.entity';
import Seat from '../src/seats/seat.entity';
import Room from '../src/rooms/rooms.entity';

export const typeOrmConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_DATABASE,
    entities: [
      Movie,
      User,
      Product,
      Showtimes,
      Seat,
      Branch,
      Room,
      BranchProduct,
      Order,
      OrderDetails,
    ],
    synchronize: Number(process.env.DB_SYNC) === 1,
    dropSchema: Number(process.env.DB_DROP) === 1,
    ssl: true,
    extra: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  }),
);
