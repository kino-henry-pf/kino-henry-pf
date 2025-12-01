import { Module } from '@nestjs/common';
import { BranchService } from './branchs.service';
import { BranchController } from './branchs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './branch.entity';
import { BranchRepository } from './branch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService, BranchRepository],
  exports: [BranchService],
})
export class BranchsModule {}
