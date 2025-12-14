import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import Movie from '../movies/movie.entity';
import { User } from '../users/entity/user.entity';
import Product from '../products/product.entity';
import Showtimes from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';
import { BranchProduct } from '../branchsproducts/branch_products.entity';
import { Order } from '../orders/entities/order.entity';
import OrderDetails from '../orders/entities/orderDetails.entity';
import Seat from '../seats/seat.entity';
import Room from '../rooms/rooms.entity';
import Reservation from '../reservations/reservation.entity';
import SeatReservation from '../reservations/seat-reservation.entity';
import { Review } from '../reviews/review.entity';

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
      Reservation,
      SeatReservation,
      Review,
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
