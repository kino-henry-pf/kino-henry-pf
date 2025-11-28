import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateOrderDto {
  @ApiProperty({
    example: 'b7e8d1f2-1234-4567-89ab-cdef12345678',
    description: 'ID del usuario que realiza la orden',
  })
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @ApiProperty({
    example: ['b7e8d1f2-1234-4567-89ab-cdef12345678'],
    description: 'ID de la reservación a la que corresponde la orden',
  })
  @IsNotEmpty()
  @IsUUID()
  reservationId: string

  @ApiProperty({
    example: ['b7e8d1f2-1234-4567-89ab-cdef12345678'],
    description: 'ID de la sucursal que atiende a la orden',
  })
  @IsNotEmpty()
  @IsUUID()
  branchId: string

  @ApiProperty({
    example: ['b7e8d1f2-1234-4567-89ab-cdef12345678'],
    description: 'ID de los detalles de la orden',
  })
  @IsNotEmpty()
  @IsUUID()
  orderDetailsId: string
}