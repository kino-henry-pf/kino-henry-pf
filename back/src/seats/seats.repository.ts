import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Seat from './seat.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class SeatsRepository {
  constructor(
    @InjectRepository(Seat) private readonly seatsRepository: Repository<Seat>,
  ) {}

  async findByRoom(roomId: string): Promise<Seat[]> {
    return await this.seatsRepository.find({ where: { roomId } });
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
}
