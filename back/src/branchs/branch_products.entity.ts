import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Branch} from './branch.entity';
import Product from '../products/product.entity'

@Entity('branch_products')
export class BranchProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @ManyToOne(() => Branch, (branch) => branch.branchProducts, {
    onDelete: 'CASCADE',
  })
  branch: Branch;

  @ManyToOne(() => Product, (product) => product.branchProducts, {
    onDelete: 'CASCADE',
  })
  product: Product;
}