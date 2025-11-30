import { ArrayNotEmpty, IsArray, IsUUID } from 'class-validator';

export default class CreateReservationDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  showtimeId: string;

  @IsArray()
  @ArrayNotEmpty()
  seatIds: string[];
}
