import { IsUUID, IsNotEmpty, IsEnum, IsDateString } from 'class-validator';
import { Format, Language } from '../showtimes.entity';

export class CreateShowtimeDto {
  @IsUUID()
  @IsNotEmpty()
  movieId: string;

  @IsNotEmpty()
  branchId: string;

  @IsNotEmpty()
  roomId: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsEnum(Language)
  @IsNotEmpty()
  language: Language;

  @IsEnum(Format)
  @IsNotEmpty()
  format: Format;
}
