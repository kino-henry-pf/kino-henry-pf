import { Module } from '@nestjs/common';
import { BranchService } from './branchs.service';
import { BranchController } from './branchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { BranchRepository } from './branch.repository';
import { GoogleMapsModule } from '../google-maps/google-maps.module';
import Showtime from 'src/showtimes/showtimes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch, Showtime]), GoogleMapsModule],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService],
})
export class BranchsModule {}
