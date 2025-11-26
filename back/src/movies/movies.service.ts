import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import Movie from './movie.entity';
import { MoviesRepository } from './movie.repository';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
import CloudinaryService from '../cloudinary/cloudinary.service';

@Injectable()
export class MoviesService {
  constructor(
    private readonly moviesRepository: MoviesRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

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

  async createMovie(
    dto: CreateMovieDto,
    file?: Express.Multer.File,
  ): Promise<Movie> {
    try {
      // ✅ El archivo es obligatorio
      if (!file) {
        throw new BadRequestException('Image file is required');
      }

      const imageUrl = await this.cloudinaryService.uploadImage(
        file,
        'kino/movies',
      );

      return await this.moviesRepository.createMovie({
        ...dto,
        image: imageUrl,
      } as CreateMovieDto);
    } catch (error) {
      throw new BadRequestException('Error creating new movie: ' + error);
    }
  }

  async updateMovie(
    id: string,
    dto: UpdateMovieDto,
    file?: Express.Multer.File,
  ): Promise<Movie> {
    try {
      const movie = await this.moviesRepository.findById(id);
      if (!movie) return this.notFound(id); // ✅ Con return aquí

      let imageUrl = dto.image;

      if (file) {
        imageUrl = await this.cloudinaryService.uploadImage(
          file,
          'kino/movies',
        );
      }

      const updated = await this.moviesRepository.updateMovie(id, {
        ...dto,
        image: imageUrl || movie.image,
      });

      return updated!;
    } catch (error) {
      throw new BadRequestException('Error updating movie: ' + error);
    }
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.moviesRepository.deleteMovie(id);
    if (!movie) this.notFound(id);
  }

  private notFound(id: string): never {
    throw new NotFoundException(`No movie with an id of ${id} has been found.`);
  }
}
