import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Reservation from './reservation.entity';
import { UsersModule } from '../users/users.module';
import { ShowtimesModule } from '../showtimes/showtimes.module';
import { SeatsModule } from '../seats/seats.module';
import ReservationRepository from './reservation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    UsersModule,
    ShowtimesModule,
    SeatsModule,
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
  exports: [ReservationsService],
})
export class ReservationsModule {}
