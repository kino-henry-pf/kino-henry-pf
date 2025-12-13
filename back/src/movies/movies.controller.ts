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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import Movie from './movie.entity';
import CreateMovieDto from './DTOs/create-movie.dto';
import { UpdateMovieDto } from './DTOs/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/role-guard.guard';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/decorator/role.decorator';

@ApiTags('movies (Películas)')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({
    summary: 'Obtener Películas',
    description:
      'Obtiene Películas que coincidan total o parcialmente con su título, si se ejecuta vacío entrega todas las peliculas registradas',
  })
  @Get()
  async findAllOrByTitle(@Query('title') title?: string): Promise<Movie[]> {
    if (title) return await this.moviesService.findByTitle(title);
    return await this.moviesService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene películas a través de su UUID' })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Movie> {
    return await this.moviesService.findById(id);
  }

  @ApiOperation({ summary: 'Registrar una nueva película' })
  @Post()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Movie> {
    return await this.moviesService.createMovie(createMovieDto, file);
  }

  @ApiOperation({
    summary: 'Actualizar una o más propiedades de una película ya registrada',
  })
  @Patch(':id')
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
  async updateMovie(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<Movie> {
    return await this.moviesService.updateMovie(id, updateMovieDto, file);
  }

  @ApiOperation({ summary: 'Eliminar una pelicula a través de su UUID' })
  @Delete(':id')
  @HttpCode(204)
  async deleteMovie(@Param('id') id: string) {
    return await this.moviesService.deleteMovie(id);
  }
}
