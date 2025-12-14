import {
  Controller,
  Post,
  Patch,
  Get,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BranchProductsService } from './branchsproducts.service';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { UpdateStockDto } from './dto/update-branch-product.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../decorator/role.decorator';
import { Role } from '../auth/roles.enum';
import { AuthGuard } from '../auth/guards/auth-guard.guard';
import { RolesGuard } from '../auth/guards/role-guard.guard';

@ApiTags('branch-products (Manejo de stock de productos por sucursal)')
@Controller('branch-products')
export class BranchProductsController {
  constructor(private readonly bpService: BranchProductsService) {}

  @ApiOperation({
    summary:
      'Obtener toda la informacion almacenada en la tabla branch_product',
  })
  @Get()
  getAll() {
    return this.bpService.getall();
  }

  @ApiOperation({
    summary:
      'Registrar un producto y su stock disponibles en una sucursal específica',
  })
  @Post() //Asignar un producto con su stock a una sucursal
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() dto: CreateBranchProductDto) {
    return this.bpService.create(dto);
  }

  @ApiOperation({ summary: 'Actualizar el stock de un producto' })
  @Patch(':id/stock') //Actualizar stock de un producto
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return this.bpService.updateStock(id, dto);
  }

  @ApiOperation({
    summary: 'Obtener todos los productos y su stock actual de una sucursal',
  })
  @Get('/branch/:branchId') //Ver inventario de una sucursal en especifico
  findByBranch(@Param('branchId') branchId: string) {
    return this.bpService.findByBranch(branchId);
  }

  @ApiOperation({
    summary:
      'Obtener todas las sucursales en la que esta disponible un producto',
  })
  @Get('/product/:productId') //Ver en cuales sucursales esta disponible un producto
  findBranchesByProduct(@Param('productId') productId: string) {
    return this.bpService.findBranchesByProduct(productId);
  }

  @ApiOperation({
    summary:
      'Eliminar un producto de una sucursal mediante el UUID de la relacion',
  })
  @Delete(':id') //Eliminar un producto de una sucursal
  @Roles(Role.admin)
  @UseGuards(AuthGuard, RolesGuard)
  remove(@Param('id') id: string) {
    return this.bpService.remove(id);
  }
}
