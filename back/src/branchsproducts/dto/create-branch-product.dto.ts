import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsInt, Min, IsOptional } from 'class-validator';

export class CreateBranchProductDto {

  @ApiProperty({
      example: '957fc03d-7a0c-406e-a4d3-e69cd83a3c3b',
      description: 'UUID de una sucursal registrada',
    })
  @IsUUID()
  branchId: string;

  @ApiProperty({
      example: '6a97f44c-09bb-4dc2-894a-0a81a0c43bc7',
      description: 'UUID de un producto registrado',
    })
  @IsUUID()
  productId: string;

  @ApiProperty({
      example: 123,
      description: 'Stock disponible de un producto',
    })
  @IsInt()
  @Min(0)
  stock: number;

  @IsOptional()
  priceOverride?: number;
}