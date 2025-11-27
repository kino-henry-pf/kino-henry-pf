import { Controller, Post, Patch, Get, Delete, Param, Body } from '@nestjs/common';
import { BranchProductsService } from './branchsproducts.service';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { UpdateStockDto } from './dto/update-branch-product.dto';

@Controller('branch-products')
export class BranchProductsController {
  constructor(private readonly bpService: BranchProductsService) {}

  @Post() //Asignar un producto con su stock a una sucursal
  create(@Body() dto: CreateBranchProductDto) {
    return this.bpService.create(dto);
  }

  @Patch(':id/stock') //Actualizar stock de un producto
  updateStock(@Param('id') id: string, @Body() dto: UpdateStockDto) {
    return this.bpService.updateStock(id, dto);
  }

  @Get('/branch/:branchId') //Ver inventario de una sucursal en especifico
  findByBranch(@Param('branchId') branchId: string) {
    return this.bpService.findByBranch(branchId);
  }

  @Get('/product/:productId') //Ver en cuales sucursales esta disponible un producto
  findBranchesByProduct(@Param('productId') productId: string) {
    return this.bpService.findBranchesByProduct(productId);
  }

  @Delete(':id') //Eliminar un producto de una sucursal
  remove(@Param('id') id: string) {
    return this.bpService.remove(id);
  }
}