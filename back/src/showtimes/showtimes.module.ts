import { Module } from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import { ShowtimesController } from './showtimes.controller';
import ShowtimesRepository from './showtimes.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import Showtime from './showtimes.entity';
import { MoviesModule } from '../movies/movies.module';
import { BranchsModule } from '../branchs/branchs.module';
import { Branch } from '../branchs/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Showtime, Branch]), MoviesModule, BranchsModule],
  controllers: [ShowtimesController],
  providers: [ShowtimesService, ShowtimesRepository],
  exports: [ShowtimesService],
})
export class ShowtimesModule {}
