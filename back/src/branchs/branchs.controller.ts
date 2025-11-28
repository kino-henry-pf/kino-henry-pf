import { Controller, Get, Post, Put, Delete, Param, Body, Query, Patch } from '@nestjs/common';
import { BranchService } from './branchs.service';
import { Branch } from './branch.entity';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';import { ApiOperation, ApiTags } from '@nestjs/swagger';
@Controller('branches')

@ApiTags('branches (Sucursales)')
@Controller('branches')
export class BranchController {
  constructor(private readonly branchService: BranchService) {}

  @ApiOperation({ summary: 'Obtener todas las sucursales registradas' })
  @Get()
  findAll(): Promise<Branch[]> {
    return this.branchService.findAll();
  }

  @ApiOperation({ summary: 'Obtener sucursales por busqueda parcial de su dirección',
    description:'Este endpoint retorna una o mas sucursales que coincidan total o parcialmente entre su dirección registrada y la busqueda realizada'
   })
  @Get('search')
  findByPartialAddress(@Query('q') search: string): Promise<Branch[]> {
    return this.branchService.findBranchesByPartialAddress(search);
  }

  @ApiOperation({ summary: 'Obtener una sucursal por su UUID' })
  @Get(':id')
  findById(@Param('id') id: string): Promise<Branch> {
    return this.branchService.findById(id);
  }

  @ApiOperation({ summary: 'Registrar una nueva sucursal' })
  @Post()
  createBranch(@Body() dto: CreateBranchDto): Promise<Branch> {
    return this.branchService.createBranch(dto);
  }

  @ApiOperation({ summary: 'Actualizar una o varias propiedades de una sucursal registrada' })
  @Patch(':id')
  updateBranch(@Param('id') id: string, @Body() dto: UpdateBranchDto): Promise<Branch> {
    return this.branchService.updateBranch(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar una sucursal a traves de su UUID' })
  @Delete(':id')
  deleteBranch(@Param('id') id: string): Promise<string> {
    return this.branchService.deleteBranch(id)
  }
}