import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Showtime from './showtimes.entity';
import { Repository } from 'typeorm';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
import { Branch } from '../branchs/branch.entity';

@Injectable()
export default class ShowtimesRepository {
  constructor(
    @InjectRepository(Showtime)
    private readonly showtimesRepository: Repository<Showtime>,
    @InjectRepository(Branch)
    private readonly branchesRepository: Repository<Branch>,
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
  async findByMovieAndBranch(movieId: string, branchId: string) {
    return await this.showtimesRepository.find({
      where: {
        movieId,
        room: { branchId },
      },
      relations: ['room', 'room.branch'],
    });
  }

  async createMovie(dto: CreateShowtimeDto): Promise<Showtime> {
    const newShowtime = this.showtimesRepository.create(dto);
    const branch = await this.branchesRepository.findOne({
      where: {id: dto.branchId},
      relations: ["movies"]
    })
    const updatedBranch = this.branchesRepository.create({
      id: branch.id,
      movies: [
        ...branch.movies,
        {id: dto.movieId}
      ]
    })
    await this.branchesRepository.save(updatedBranch)
    return await this.showtimesRepository.save(newShowtime);
  }

  async deleteShowtime(id: string): Promise<Showtime | null> {
    const showtime = await this.findOneOrNull(id);
    if (!showtime) return null;

    const deleteFromBranch = await this.showtimesRepository.count({
      where: {
        room: {
          branchId: showtime.room.branchId
        },
        movieId: showtime.movieId,
      }
    })

    if (deleteFromBranch <= 1) {
      const updatedBranch = this.branchesRepository.create({
        id: showtime.room.branchId,
        movies: showtime.room.branch.movies.filter(m => m.id !== id)
      })
      await this.branchesRepository.save(updatedBranch)
    }

    await this.showtimesRepository.delete(id);
    return showtime;
  }

  private async findOneOrNull(id: string): Promise<Showtime | null> {
    const showtime = await this.showtimesRepository.findOne({
      where: { id },
      relations: ['movie', 'room', 'room.branch', 'room.branch.movies'],
    });
    return showtime || null;
  }
}
