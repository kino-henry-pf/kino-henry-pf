import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Query,
  Res,
  BadRequestException,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './DTOs/login-user.dto';
import { RegisterUserDto } from './DTOs/register-user.dto';
import { supabase } from '../../config/supabase.client';
import UsersRepository from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import type { Provider } from '@supabase/auth-js';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from './guards/auth-guard.guard';
import { RolesGuard } from './guards/role-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  signup(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  signin(@Body() dto: LoginUserDto) {
    return this.authService.signin(dto);
  }

@Get('login')
async login(@Query('provider') provider: string, @Res() res) {
  if (!provider) provider = 'google';

  return this.authService.login(provider, res)
}

@Get('callback')
async oauthCallback(@Query('code') code: string, @Res() res: any) {
  if (!code) throw new BadRequestException('Missing OAuth code');
  return this.authService.oauthCallback(code, res)
}

@Patch('/users/:id/promote')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async promote(@Param('id') id: string) {
    return await this.authService.promote(id);
  }
}


  

