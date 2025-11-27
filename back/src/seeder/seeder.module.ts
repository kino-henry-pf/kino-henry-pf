import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from '../movies/movie.entity';
import { SeederService } from './seeder.service';
import { User } from '../users/entity/user.entity';
import Product from '../products/product.entity';
import Showtime from '../showtimes/showtimes.entity';
import { Branch } from '../branchs/branch.entity';
import { BranchProduct } from '../branchsproducts/branch_products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Movie,
      User,
      Product,
      Showtime,
      Branch,
      BranchProduct,
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
