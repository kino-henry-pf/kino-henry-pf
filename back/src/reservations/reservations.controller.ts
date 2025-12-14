import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import Reservation from './reservation.entity';
import CreateReservationDto from './DTOs/create-reservation.dto';
import { AuthGuard } from '../auth/guards/auth-guard.guard';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}
  @Get('all')
  async getAllReservations() {
    return this.reservationsService.getAllReservations();
  }

  @Get('all/upcoming')
  async getAllUpcomingReservations() {
    return this.reservationsService.getAllUpcomingReservations();
  }

  @Get('all/past')
  async getAllPastReservations() {
    return this.reservationsService.getAllPastReservations();
  }

  @Get('user/:id')
  async getByUser(@Param('id') userId: string): Promise<Reservation[]> {
    return await this.reservationsService.getByUser(userId);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<Reservation> {
    return await this.reservationsService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async cancel(@Param('id') id: string): Promise<Reservation> {
    return await this.reservationsService.cancel(id);
  }

  @Post()
  async createReservation(
    @Body() dto: CreateReservationDto,
  ): Promise<Reservation> {
    return await this.reservationsService.createReservation(dto);
  }

  @Get('user/:userId/upcoming')
  async getUpcomingReservations(@Param('userId') userId: string) {
    return this.reservationsService.getUpcomingReservations(userId);
  }

  @Get('user/:userId/past')
  async getPastReservations(@Param('userId') userId: string) {
    return this.reservationsService.getPastReservations(userId);
  }
}
