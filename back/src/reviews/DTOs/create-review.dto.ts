import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNumber(
    { maxDecimalPlaces: 1 },
    { message: 'rating must have at most 1 decimal' },
  )
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  review: string;
  @IsUUID()
  movieId: string;
  @IsUUID()
  userId: string;
}
