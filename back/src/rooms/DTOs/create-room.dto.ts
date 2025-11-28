import { IsNotEmpty, IsUUID } from 'class-validator';

export default class CreateRoomDto {
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsNotEmpty()
  branchId: string;
}
