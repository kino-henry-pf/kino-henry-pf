import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export default class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name?: string;

  @Transform(({value}) => value === "" ? undefined : value)
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  address?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
