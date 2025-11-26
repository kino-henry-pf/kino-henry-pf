import { ApiProperty } from '@nestjs/swagger';
import { PickType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class loginUserDTO extends PickType(CreateUserDto, ['email', 'password'] as const) {
  @ApiProperty({
    example: 'juanperez@mail.com',
    description: 'Correo electrónico válido',
  })
  email: string;

  @ApiProperty({
    example: 'Passw0rd!',
    description: 'Contraseña del usuario',
  })
  password: string;
}