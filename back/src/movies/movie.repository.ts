import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Movie from './movie.entity';
import { ILike, Repository } from 'typeorm';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';

@Injectable()
export class MoviesRepository {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find();
  }

  async findByTitle(title: string): Promise<Movie[]> {
    return await this.moviesRepository.find({
      where: { title: ILike(`%${title}%`) },
    });
  }

  async findById(id: string): Promise<Movie | null> {
    const movie = await this.findOneOrNull(id);
    if (!movie) return null;
    return movie;
  }

  async createMovie(dto: CreateMovieDto): Promise<Movie> {
    const newMovie = this.moviesRepository.create({
      title: dto.title,
      sinopsis: dto.sinopsis,
      rating: dto.rating,
      genre: dto.genre,
      image: dto.image,
      duration: dto.duration,
    });
    return await this.moviesRepository.save(newMovie);
  }

  async updateMovie(id: string, dto: UpdateMovieDto): Promise<Movie | null> {
    const movie = await this.findOneOrNull(id);
    if (!movie) return null;
    const updated = Object.assign(movie, dto);
    await this.moviesRepository.save(updated);
    return await this.findOneOrNull(id);
  }

  async deleteMovie(id: string): Promise<Movie | null> {
    const movie = await this.findOneOrNull(id);
    if (!movie) return null;
    await this.moviesRepository.delete(id);
    return movie;
  }

  private async findOneOrNull(id: string): Promise<Movie | null> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (!movie) return null;
    return movie;
  }
}
