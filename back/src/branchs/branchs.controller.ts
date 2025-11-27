import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { BranchService } from './branchs.service';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';@Controller('branches')


@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @Get()
  findAll(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

  @Get('search')
  findByPartialAddress(@Query('q') search: string): Promise<Branch[]> {
    return this.branchService.findBranchesByPartialAddress(search);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findById(id);
  }

  @Post()
  createBranch(@Body() dto: CreateBranchDto): Promise<Branch> {
    return this.branchService.createBranch(dto);
  }

  @Put(':id')
  updateBranch(@Param('id') id: string, @Body() dto: UpdateBranchDto): Promise<Branch> {
    return this.branchService.updateBranch(id, dto);
  }

  @Delete(':id')
  deleteBranch(@Param('id') id: string): Promise<string> {
    return this.branchService.deleteBranch(id)
  }
}