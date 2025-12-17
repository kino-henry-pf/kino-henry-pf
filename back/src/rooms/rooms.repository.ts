import { Injectable } from '@nestjs/common';
import Room from './rooms.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateRoomDto from './DTOs/create-room.dto';

@Injectable()
export default class RoomsRepository {
  constructor(
    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
  ) {}

  async findAll(): Promise<Room[]> {
    return await this.roomsRepository.find({
      relations: {
        branch: true,
      },
    });
  }

  async findById(id: string): Promise<Room | null> {
    const room = await this.roomsRepository.findOne({
      where: { id },
      relations: { branch: true },
    });
    return room ?? null;
  }

  async findByBranch(branchId: string): Promise<Room[]> {
    return await this.roomsRepository.find({ where: { branchId } });
  }

  async createRoom(dto: CreateRoomDto): Promise<Room> {
    const room = this.roomsRepository.create(dto);
    return await this.roomsRepository.save(room);
  }
  async deleteRoom(id: string): Promise<Room | null> {
    const room = await this.findOneOrNull(id);
    if (!room) return null;
    await this.roomsRepository.delete(id);
    return room;
  }
  private async findOneOrNull(id: string): Promise<Room | null> {
    const room = await this.roomsRepository.findOneBy({ id });
    if (!room) return null;
    return room;
  }
}
