import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import Movie from './movie.entity';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAllOrByTitle(@Query('title') title?: string): Promise<Movie[]> {
    if (title) return await this.moviesService.findByTitle(title);
    return await this.moviesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Movie> {
    return await this.moviesService.findById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Movie> {
    return await this.moviesService.createMovie(createMovieDto, file);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Movie> {
    return await this.moviesService.updateMovie(id, updateMovieDto, file);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteMovie(@Param('id') id: string) {
    return await this.moviesService.deleteMovie(id);
  }
}
