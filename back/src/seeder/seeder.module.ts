import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Movie from '../movies/movie.entity';
import { SeederService } from './seeder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {}
