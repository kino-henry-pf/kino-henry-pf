import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Movie from './movie.entity';
import { MoviesRepository } from './movie.repository';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(private readonly moviesRepository: MoviesRepository) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.findAll();
  }

  async findByTitle(title: string): Promise<Movie[]> {
    const movies = await this.moviesRepository.findByTitle(title);
    return movies;
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.moviesRepository.findById(id);
    return movie ?? this.notFound(id);
  }

  async createMovie(dto: CreateMovieDto): Promise<Movie> {
    try {
      const newMovie = await this.moviesRepository.createMovie(dto);
      return newMovie;
    } catch (error) {
      throw new BadRequestException('Error creating new movie: ' + error);
    }
  }

  async updateMovie(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const updatedMovie = await this.moviesRepository.updateMovie(id, dto);
    return updatedMovie ?? this.notFound(id);
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.moviesRepository.deleteMovie(id);
    if (!movie) this.notFound(id);
  }

  private notFound(id): never {
    throw new NotFoundException(`No movie with an id of ${id} has been found.`);
  }
}
