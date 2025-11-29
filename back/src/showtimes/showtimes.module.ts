import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import ShowtimesRepository from './showtimes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Showtime from './showtimes.entity';
import { MoviesModule } from '../movies/movies.module';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime]), MoviesModule],
  controllers: [ShowtimesController],
  providers: [ShowtimesService, ShowtimesRepository],
  exports: [ShowtimesService],
})
export class ShowtimesModule {}
