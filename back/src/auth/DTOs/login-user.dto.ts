import { IsEmail, IsString } from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
