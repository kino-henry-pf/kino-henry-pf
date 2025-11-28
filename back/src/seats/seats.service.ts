import { Injectable, NotFoundException } from '@nestjs/common';
import SeatsRepository from './seats.repository';
import Seat from './seat.entity';

@Injectable()
export class SeatsService {
  constructor(private readonly seatsRepository: SeatsRepository) {}

  async findByRoom(roomId: string): Promise<Seat[]> {
    return await this.seatsRepository.findByRoom(roomId);
  }

  async findById(id: string): Promise<Seat> {
    const seat = await this.seatsRepository.findById(id);
    if (!seat)
      throw new NotFoundException(`No seat with an id of ${id} found.`);
    return seat;
  }

  async generateSeatsForRoom(roomId: string): Promise<void> {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seats: { roomId: string; row: string; number: number }[] = [];

    for (const row of rows) {
      for (let number = 1; number <= 12; number++) {
        seats.push({ roomId, row, number });
      }
    }

    await this.seatsRepository.createMany(seats);
  }
}
