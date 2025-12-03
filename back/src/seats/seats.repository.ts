import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Seat from './seat.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export default class SeatsRepository {
  constructor(
    @InjectRepository(Seat) private readonly seatsRepository: Repository<Seat>,
  ) {}

  async findByRoom(roomId: string): Promise<Seat[]> {
    return await this.seatsRepository.find({ where: { roomId } });
  }

  async findAvailableSeats(roomId: string): Promise<Partial<Seat>[]> {
    const seats = await this.seatsRepository.find({
      where: { roomId, reserved: false },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return seats.map(({ reserved, ...rest }) => rest);
  }

  async findById(id: string): Promise<Seat | null> {
    const seat = await this.seatsRepository.findOneBy({ id });
    return seat ?? null;
  }

  async createMany(
    seats: { roomId: string; row: string; number: number }[],
  ): Promise<void> {
    const entities = seats.map((seat) => this.seatsRepository.create(seat));
    await this.seatsRepository.save(entities);
  }

  async findManyByIds(ids: string[]): Promise<Seat[]> {
    if (ids.length === 0) return [];
    return await this.seatsRepository.find({
      where: { id: In(ids) },
    });
  }

  async markSeatsReserved(seatIds: string[]) {
    const seats = await this.findManyByIds(seatIds);
    seats.forEach((seat) => {
      seat.reserved = true;
    });
    await this.seatsRepository.save(seats);
  }
}
