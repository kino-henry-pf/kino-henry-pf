import { Branch } from '../branchs/branch.entity';
import Product from '../products/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  Unique,
} from 'typeorm';

@Entity('branch_products')
@Unique(['branchId', 'productId'])
export class BranchProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Branch, (branch) => branch.branchProducts, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @Column()
  branchId: string;

  @ManyToOne(() => Product, (product) => product.branchProducts, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column()
  productId: string;

  @Column({ type: 'int' })
  stock: number;
}
