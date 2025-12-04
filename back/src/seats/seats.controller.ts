import { Controller, Get, Param } from '@nestjs/common';
import { SeatsService } from './seats.service';
import Seat from './seat.entity';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Get('room/available/:roomId')
  async findAvailableSeats(
    @Param('roomId') roomId: string,
  ): Promise<Partial<Seat>[]> {
    return await this.seatsService.findAvailableSeats(roomId);
  }
  @Get('room/:roomId')
  async findByRoom(@Param('roomId') roomId: string): Promise<Seat[]> {
    return await this.seatsService.findByRoom(roomId);
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Seat> {
    return await this.seatsService.findById(id);
  }
}
