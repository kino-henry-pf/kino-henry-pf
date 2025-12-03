import { Injectable } from '@nestjs/common';
import { BranchRepository } from './branch.repository';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';
import { UpdateBranchLocationDto } from './dto/branch-location.dto';

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

  linkGooglePlace(branchId: string, googlePlaceId: string){
    return this.branchRepository.linkGooglePlace(branchId, googlePlaceId)
  }

  updateLocation(
      branchId: string,
      locationDto: UpdateBranchLocationDto,
    ){
      return this.branchRepository.updateLocation(branchId, locationDto)
    }

  async geocodeBranchAddress(branchId: string): Promise<Branch>{
    return this.branchRepository.geocodeBranchAddress(branchId)

  }

  async getBranchGoogleDetails(branchId: string){
    return this.branchRepository.getBranchGoogleDetails(branchId)
  }

  getGoogleMapsUrl(branch: Branch): string{
    return this.branchRepository.getGoogleMapsUrl(branch)
  }


}
