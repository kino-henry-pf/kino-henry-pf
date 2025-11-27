import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class CreateBranchProductDto {
  @IsUUID()
  branchId: string;

  @IsUUID()
  productId: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  priceOverride?: number;
}