import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Room from './rooms.entity';
import RoomsRepository from './rooms.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Room])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsRepository],
})
export class RoomsModule {}
