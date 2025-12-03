import {
  IsString,
  IsNumber,
  IsOptional,
  IsNotEmpty,
  Min,
  Max,
  IsLatitude,
  IsLongitude,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateBranchLocationDto {
  @ApiPropertyOptional({ description: 'Latitude of the branch' })
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude of the branch' })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  longitude?: number;

  @ApiPropertyOptional({ description: 'Google Place ID' })
  @IsOptional()
  @IsString()
  googlePlaceId?: string;

  @ApiPropertyOptional({ description: 'Address of the branch' })
  @IsOptional()
  @IsString()
  address?: string;
}

export class SearchPlacesDto {
  @ApiProperty({ description: 'Search query (e.g., "Cinema Buenos Aires")' })
  @IsNotEmpty()
  @IsString()
  query: string;

  @ApiPropertyOptional({ description: 'Latitude for location bias' })
  @IsOptional()
  @IsNumber()
  @IsLatitude()
  lat?: number;

  @ApiPropertyOptional({ description: 'Longitude for location bias' })
  @IsOptional()
  @IsNumber()
  @IsLongitude()
  lng?: number;
}

export class SetPlaceIdDto {
  @ApiProperty({ description: 'Google Place ID to associate with the branch' })
  @IsNotEmpty()
  @IsString()
  googlePlaceId: string;
}

export class GeocodeAddressDto {
  @ApiProperty({ description: 'Address to geocode' })
  @IsNotEmpty()
  @IsString()
  address: string;
}

export class FindNearbyBranchesDto {
  @ApiProperty({ description: 'Latitude of the search point' })
  @IsNotEmpty()
  @IsNumber()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: 'Longitude of the search point' })
  @IsNotEmpty()
  @IsNumber()
  @IsLongitude()
  longitude: number;

  @ApiPropertyOptional({
    description: 'Maximum distance in kilometers',
    default: 10,
  })
  @IsOptional()
  @IsNumber()
  @Min(0.1)
  @Max(100)
  maxDistance?: number;
}