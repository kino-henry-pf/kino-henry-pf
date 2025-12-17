import { BadRequestException, Injectable } from '@nestjs/common';
import Room from './rooms.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CreateRoomDto from './DTOs/create-room.dto';
import { UpdateRoomDto } from './DTOs/update-room.dto';

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
  async updateRoom(id: string, dto: UpdateRoomDto): Promise<Room> {
    await this.findById(id);
    await this.roomsRepository.update(id, dto);
    const updatedRoom = await this.roomsRepository.findOneBy({ id });

    if (!updatedRoom) {
      throw new BadRequestException(`Error al actualizar la sala con id ${id}`);
    }
    return updatedRoom;
  }
}
