import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ShowtimesService } from './showtimes.service';
import Showtime from './showtimes.entity';
import { CreateShowtimeDto } from './DTOs/create-showtime.dto';

@Controller('showtimes')
export class ShowtimesController {
  constructor(private readonly showtimesService: ShowtimesService) {}

  @Get()
  async findAll(): Promise<Showtime[]> {
    return await this.showtimesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Showtime> {
    return await this.showtimesService.findById(id);
  }

  @Post()
  async createShowtime(@Body() dto: CreateShowtimeDto): Promise<Showtime> {
    return await this.showtimesService.createShowtime(dto);
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteShowTime(@Param('id') id: string) {
    return await this.showtimesService.deleteShowTime(id);
  }
}
