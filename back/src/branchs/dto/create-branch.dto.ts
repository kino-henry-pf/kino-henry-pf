import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, MaxLength } from 'class-validator';

export class CreateBranchDto {

  @ApiProperty({
    example: 'Kino del Valle',
    description: 'Nombre de la sucursal',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  name: string;

  @ApiProperty({
    example: 'Av. Principal 123, Centro Comercial MundoShop, Ciudad de México',
    description: 'Dirección completa de la sucursal.',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  address: string;

  @ApiProperty({
    example: 19.432608,
    description: 'Latitud geográfica de la sucursal.',
  })
  @IsNumber()
  latitude: number;

  @ApiProperty({
    example: -99.133209,
    description: 'Longitud geográfica de la sucursal.',
  })
  @IsNumber()
  longitude: number;

  @ApiProperty({
    example: 'ChIJU4MpT9i_0YURgQdX1bw5Q1g',
    description: 'ID del lugar en Google Places (opcional).',
    required: false,
  })
  @IsString()
  @IsOptional()
  googlePlaceId?: string;

  
}