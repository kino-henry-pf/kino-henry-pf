import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { Genre } from '../movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateMovieDto {

  @ApiProperty({
      example: 'The Dark Knight',
      description: 'Título de la película',
    })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
      example: 'Batman faces the Joker.',
      description: 'Sinopsis de la película',
    })
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  synopsis: string;

  @ApiProperty({
      example: 4.9,
      description: 'Calificación de la película, del 1 al 5, debe tener al menos 1 decimal',
    })
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'rating must have at most 1 decimal' },
  )
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({
      example: 'action',
      enum:Genre
    })
  @IsEnum(Genre)
  genre: Genre;

  @ApiProperty({
      example: 152,
      description: 'Duración de la película se registra como un número entero de minutos',
    })
  @IsNumber()
  duration: number;
}
