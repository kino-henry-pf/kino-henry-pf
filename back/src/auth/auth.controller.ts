import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { loginUserDTO } from '../users/dto/login-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  signup(@Body() user: CreateUserDto) {
    return this.authService.signup(user);
  }
  @Post('signin')
  signin(@Body() credentials: loginUserDTO) {
    return this.authService.signin(credentials);
  }
}
