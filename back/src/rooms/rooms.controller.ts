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
import { RoomsService } from './rooms.service';
import Room from './rooms.entity';
import CreateRoomDto from './DTOs/create-room.dto';
import { RolesGuard } from '../auth/guards/role-guard.guard';
import { AuthGuard } from '../auth/guards/auth-guard.guard';
import { Role } from '../auth/roles.enum';
import { Roles } from '../decorator/role.decorator';
import { ApiOperation } from '@nestjs/swagger';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async findAll(): Promise<Room[]> {
    return await this.roomsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Room> {
    return await this.roomsService.findById(id);
  }

  @Get('/branch/:branchId')
  async findByBranch(@Param('branchId') branchId: string): Promise<Room[]> {
    return await this.roomsService.findByBranch(branchId);
  }

  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Post()
  async createRoom(@Body() dto: CreateRoomDto): Promise<Room> {
    return await this.roomsService.createRoom(dto);
  }
  @ApiOperation({ summary: 'Eliminar una sala a través de su UUID' })
  @Delete(':id')
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(204)
  async deleteRoom(@Param('id') id: string) {
    return await this.roomsService.deleteRoom(id);
  }
}
