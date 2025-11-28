import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { BranchProductsRepository } from './branchsproducts.repository';
import { CreateBranchProductDto } from './dto/create-branch-product.dto';
import { UpdateStockDto } from './dto/update-branch-product.dto';

@Injectable()
export class BranchProductsService {
  constructor(private readonly repo: BranchProductsRepository) {}

  async getall(){
    return this.repo.getall()
  }

  async create(dto: CreateBranchProductDto) {
    const branch = await this.repo.findBranchById(dto.branchId);
    if (!branch) throw new NotFoundException('Branch not found');

    const product = await this.repo.findProductById(dto.productId);
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.repo.findRelation(dto.branchId, dto.productId);
    if (existing)
      throw new BadRequestException('Product already assigned to this branch');

    return this.repo.createRelation({
      branch,
      product,
      stock: dto.stock,
    });
  }

  async updateStock(branchProductId: string, dto: UpdateStockDto) {
    const bp = await this.repo.findById(branchProductId);
    if (!bp) throw new NotFoundException('BranchProduct not found');

    bp.stock = dto.stock;
    return this.repo.save(bp);
  }

  async findByBranch(branchId: string) {
    return this.repo.findByBranch(branchId);
  }

  async findBranchesByProduct(productId: string) {
    return this.repo.findByProduct(productId);
  }

  async remove(branchProductId: string) {
    const affected = await this.repo.delete(branchProductId);
    if (affected === 0) throw new NotFoundException('BranchProduct not found');
  }
}
