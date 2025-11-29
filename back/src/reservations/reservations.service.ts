import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import ReservationRepository from './reservation.repository';
import Reservation, { ReservationStatus } from './reservation.entity';
import CreateReservationDto from './DTOs/create-reservation.dto';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly seatsService: SeatsService,
  ) {}

  async getByUser(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.getByUser(userId);
  }

  async getById(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.getById(id);
    if (!reservation)
      throw new NotFoundException(`No reservation with an id of ${id} found.`);
    return reservation;
  }

  async cancel(id: string): Promise<Reservation> {
    const existing = await this.reservationRepository.getById(id);

    if (!existing) {
      throw new NotFoundException(`No reservation with an id of ${id} found.`);
    }

    if (existing.status === ReservationStatus.CANCELLED) {
      throw new ConflictException('The reservation is already cancelled.');
    }

    const cancelled = await this.reservationRepository.cancel(id);

    if (!cancelled) {
      throw new NotFoundException(`No reservation with an id of ${id} found.`);
    }

    return cancelled;
  }

  async createReservation(dto: CreateReservationDto): Promise<Reservation> {
    return await this.reservationRepository.createReservation(dto);
  }
}
