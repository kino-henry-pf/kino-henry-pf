import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Reservation, { ReservationStatus } from './reservation.entity';
import { Not, Repository } from 'typeorm';
import CreateReservationDto from './DTOs/create-reservation.dto';
import { UsersService } from '../users/users.service';
import { ShowtimesService } from '../showtimes/showtimes.service';
import { SeatsService } from '../seats/seats.service';
import Showtime from 'src/showtimes/showtimes.entity';

@Injectable()
export default class ReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
    private readonly usersService: UsersService,
    private readonly showtimesService: ShowtimesService,
    private readonly seatsService: SeatsService,
  ) {}

  async getByUser(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({ where: { userId } });
  }

  async getById(id: string): Promise<Reservation | null> {
    return await this.reservationRepository.findOneBy({ id });
  }

  async cancel(id: string): Promise<Reservation | null> {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) return null;

    reservation.status = ReservationStatus.CANCELLED;
    return await this.reservationRepository.save(reservation);
  }

  async createReservation(dto: CreateReservationDto): Promise<Reservation> {
    await this.usersService.findById(dto.userId);
    const showtime = await this.showtimesService.findById(dto.showtimeId);

    await this.checkSeatAvailability(dto.seatIds, showtime);

    const reservation = this.reservationRepository.create({
      userId: dto.userId,
      showtimeId: dto.showtimeId,
      seats: dto.seatIds.map((seatId) => ({ seatId })),
    });

    return await this.reservationRepository.save(reservation);
  }

  async getReservedSeatIdsForShowtime(showtimeId: string): Promise<string[]> {
    const reservations = await this.reservationRepository.find({
      where: {
        showtimeId,
        status: Not(ReservationStatus.CANCELLED),
      },
      relations: ['seats'],
    });

    return reservations.flatMap((r) => r.seats.map((s) => s.seatId));
  }

  private async checkSeatAvailability(
    seatIds: string[],
    showtime: Showtime,
  ): Promise<void> {
    if (!seatIds.length) {
      throw new BadRequestException('At least one seat must be selected');
    }

    const seats = await this.seatsService.findManyByIds(seatIds);

    if (seats.length !== seatIds.length) {
      throw new BadRequestException('One or more seat IDs are invalid');
    }

    const invalidSeats = seats.filter(
      (seat) => seat.roomId !== showtime.roomId,
    );

    if (invalidSeats.length > 0) {
      throw new BadRequestException(
        'One or more selected seats do not belong to the showtime room',
      );
    }

    const reservedSeatIds = await this.getReservedSeatIdsForShowtime(
      showtime.id,
    );

    const taken = seatIds.filter((id) => reservedSeatIds.includes(id));

    if (taken.length > 0) {
      throw new BadRequestException(
        `These seats are already reserved: ${taken.join(', ')}`,
      );
    }
  }
}
