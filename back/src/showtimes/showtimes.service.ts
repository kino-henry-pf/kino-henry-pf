import { Injectable, NotFoundException } from '@nestjs/common';
import ShowtimesRepository from './showtimes.repository';
import Showtime from './showtimes.entity';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
import { MoviesService } from 'src/movies/movies.service';

@Injectable()
export class ShowtimesService {
  constructor(
    private readonly showtimesRepository: ShowtimesRepository,
    private readonly moviesService: MoviesService,
  ) {}
  async findAll(): Promise<Showtime[]> {
    return await this.showtimesRepository.findAll();
  }

  async findById(id: string): Promise<Showtime> {
    const showtime = await this.showtimesRepository.findById(id);
    if (!showtime) this.notFound(id);
    return showtime;
  }

  async createShowtime(dto: CreateShowtimeDto): Promise<Showtime> {
    const movie = await this.moviesService.findById(dto.movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    // 2) Create showtime
    return this.showtimesRepository.createMovie(dto);
  }

  async deleteShowTime(id: string): Promise<void> {
    const showtime = await this.showtimesRepository.deleteShowtime(id);
    if (!showtime) return this.notFound(id);
  }

  private notFound(id: string): never {
    throw new NotFoundException(
      `No showtime with an id of ${id} has been found.`,
    );
  }
}
