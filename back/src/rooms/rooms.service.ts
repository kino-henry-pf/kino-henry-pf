import { Injectable, NotFoundException } from '@nestjs/common';
import RoomsRepository from './rooms.repository';
import Room from './rooms.entity';
import CreateRoomDto from './DTOs/create-room.dto';
import { SeatsService } from '../seats/seats.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    private readonly seatsService: SeatsService,
  ) {}

  async findAll(): Promise<Room[]> {
    return await this.roomsRepository.findAll();
  }

  async findById(id: string): Promise<Room> {
    const room = await this.roomsRepository.findById(id);
    if (!room) throw new NotFoundException(`No room with id ${id} found.`);
    return room;
  }

  async findByBranch(branchId: string): Promise<Room[]> {
    return await this.roomsRepository.findByBranch(branchId);
  }

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const room = await this.roomsRepository.createRoom(dto);
    await this.seatsService.generateSeatsForRoom(room.id);
    return room;
  }
}
