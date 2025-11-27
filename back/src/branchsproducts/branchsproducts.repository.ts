import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BranchProduct } from './branch_products.entity';
import { Branch } from '../branchs/branch.entity';
import Product from 'src/products/product.entity';

@Injectable()
export class BranchProductsRepository {
  constructor(
    @InjectRepository(BranchProduct)
    private readonly repo: Repository<BranchProduct>,
    @InjectRepository(Branch)
    private readonly branchRepo: Repository<Branch>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async findBranchById(id: string): Promise<Branch | null> {
    return this.branchRepo.findOne({ where: { id } });
  }

  async findProductById(id: string): Promise<Product | null> {
    return this.productRepo.findOne({ where: { id } });
  }

  async findRelation(
    branchId: string,
    productId: string,
  ): Promise<BranchProduct | null> {
    return this.repo.findOne({ where: { branchId, productId } });
  }

  async createRelation(bp: Partial<BranchProduct>): Promise<BranchProduct> {
    const newEntity = this.repo.create(bp);
    return this.repo.save(newEntity);
  }

  async findById(id: string): Promise<BranchProduct | null> {
    return this.repo.findOne({ where: { id } });
  }

  async save(bp: BranchProduct): Promise<BranchProduct> {
    return this.repo.save(bp);
  }

  async findByBranch(branchId: string): Promise<BranchProduct[]> {
    return this.repo.find({
      where: { branchId },
      relations: ['product', 'branch'],
    });
  }

  async findByProduct(productId: string): Promise<BranchProduct[]> {
    return this.repo.find({
      where: { productId },
      relations: ['branch', 'product'],
    });
  }

  async delete(id: string): Promise<number> {
    const result = await this.repo.delete(id);
    return result.affected ?? 0;
  }
}
