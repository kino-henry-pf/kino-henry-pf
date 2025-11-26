import { Injectable } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) {}

  findAll(): Promise<Branch[]> {
    return this.branchRepository.findAll();
  }

  findBranchesByPartialAddress(search: string): Promise<Branch[]> {
    return this.branchRepository.findBranchesByPartialAddress(search);
  }

  findById(id: string): Promise<Branch> {
    return this.branchRepository.findById(id);
  }

  createBranch(dto: CreateBranchDto): Promise<Branch> {
    return this.branchRepository.createBranch(dto);
  }

  updateBranch(id: string, dto: UpdateBranchDto): Promise<Branch> {
    return this.branchRepository.updateBranch(id, dto);
  }

  deleteBranch(id: string): Promise<string> {
    return this.branchRepository.deleteBranch(id);
  }
}
