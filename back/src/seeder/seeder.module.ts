import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from '../movies/movie.entity';
import { SeederService } from './seeder.service';
import { User } from '../users/entity/user.entity';
import Product from '../products/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User, Product])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
