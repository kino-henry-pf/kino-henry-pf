import { Module } from '@nestjs/common';
import { BranchProductsService } from './branchsproducts.service';
import { BranchProductsController } from './branchsproducts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from 'src/products/product.entity';
import { Branch } from 'src/branchs/branch.entity';
import { BranchProduct } from './branch_products.entity';
import { BranchProductsRepository } from './branchsproducts.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Branch, BranchProduct])],
  controllers: [BranchProductsController],
  providers: [BranchProductsService, BranchProductsRepository],
})
export class BranchsproductsModule {}
