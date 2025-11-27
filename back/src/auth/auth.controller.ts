import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './DTOs/login-user.dto';
import { RegisterUserDto } from './DTOs/register-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  signin(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
}
