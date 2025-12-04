import { Injectable, NotFoundException } from '@nestjs/common';
import ShowtimesRepository from './showtimes.repository';
import Showtime from './showtimes.entity';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
import { MoviesService } from '../movies/movies.service';
import { BranchService } from 'src/branchs/branchs.service';

@Injectable()
export class ShowtimesService {
  constructor(
    private readonly showtimesRepository: ShowtimesRepository,
    private readonly moviesService: MoviesService,
    private readonly branchesService: BranchService,
  ) {}
  async findAll(): Promise<Showtime[]> {
    return await this.showtimesRepository.findAll();
  }

  async findById(id: string): Promise<Showtime> {
    const showtime = await this.showtimesRepository.findById(id);
    if (!showtime) this.notFound(id);
    return showtime;
  }

  async findByMovieAndBranch(
    movieId: string,
    branchId: string,
  ): Promise<Showtime[]> {
    const movieExists = await this.moviesService.findById(movieId);
    if (!movieExists) throw new NotFoundException('Movie not found');
    const branch = await this.branchesService.findById(branchId);
    if (!branch) throw new NotFoundException('Branch not found');

    return await this.showtimesRepository.findByMovieAndBranch(
      movieId,
      branchId,
    );
  }

  async createShowtime(dto: CreateShowtimeDto): Promise<Showtime> {
    const movie = await this.moviesService.findById(dto.movieId);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

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
