import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import Showtime from './showtimes.entity';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';
import { RolesGuard } from 'src/auth/guards/role-guard.guard';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { Role } from 'src/auth/roles.enum';
import { Roles } from 'src/decorator/role.decorator';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  async findAll(): Promise<Showtime[]> {
    return await this.showtimesService.findAll();
  }

  @Get('movie/:movieId/branch/:branchId')
  async findByMovieAndBranch(
    @Param('movieId') movieId: string,
    @Param('branchId') branchId: string,
  ): Promise<Showtime[]> {
    return await this.showtimesService.findByMovieAndBranch(movieId, branchId);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Showtime> {
    return await this.showtimesService.findById(id);
  }

  @Post()
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  async createShowtime(@Body() dto: CreateShowtimeDto): Promise<Showtime> {
    return await this.showtimesService.createShowtime(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteShowTime(@Param('id') id: string) {
    return await this.showtimesService.deleteShowTime(id);
  }
}
