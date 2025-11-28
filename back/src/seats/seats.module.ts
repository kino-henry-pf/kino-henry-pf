import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Seat from './seat.entity';
import SeatsRepository from './seats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Seat])],
  controllers: [SeatsController],
  providers: [SeatsService, SeatsRepository],
  exports: [SeatsService],
})
export class SeatsModule {}
