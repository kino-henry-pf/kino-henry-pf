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

export default class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  sinopsis: string;

  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'rating must have at most 1 decimal' },
  )
  @Min(0)
  @Max(5)
  rating: number;

  @IsEnum(Genre)
  genre: Genre;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  duration: number;
}
