import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Showtime from './showtimes.entity';
import { Repository } from 'typeorm';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';

@Injectable()
export default class ShowtimesRepository {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimesRepository: Repository<Showtime>,
  ) {}

  async findAll(): Promise<Showtime[]> {
    return await this.showtimesRepository.find({
      relations: ['room', 'room.branch', 'movie'],
    });
  }

  async findById(id: string): Promise<Showtime | null> {
    const showtime = await this.findOneOrNull(id);
    if (!showtime) return null;
    return showtime;
  }

  async createMovie(dto: CreateShowtimeDto): Promise<Showtime> {
    const newShowtime = this.showtimesRepository.create(dto);
    return await this.showtimesRepository.save(newShowtime);
  }

  async deleteShowtime(id: string): Promise<Showtime | null> {
    const showtime = await this.findOneOrNull(id);
    if (!showtime) return null;
    await this.showtimesRepository.delete(id);
    return showtime;
  }

  private async findOneOrNull(id: string): Promise<Showtime | null> {
    const showtime = await this.showtimesRepository.findOne({
      where: { id },
      relations: ['movie'],
    });
    return showtime || null;
  }
}
