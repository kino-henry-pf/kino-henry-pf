import { Controller, Post, Body, HttpCode, Get, Query, Res, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './DTOs/login-user.dto';
import { RegisterUserDto } from './DTOs/register-user.dto';
import { supabase } from '../../config/supabase.client';
import UsersRepository from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import type { Provider } from '@supabase/auth-js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService
  ) {}

  @Post('register')
  signup(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  signin(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }
@Get('login')
async login(@Query('provider') provider: string, @Res() res) {
  if (!provider) provider = 'google';

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as Provider,
    options: {
      redirectTo: 'http://localhost:3000/auth/callback',
  
    },
  });

  if (error) return res.status(400).json(error);

  return res.redirect(data.url);
}

@Get('callback')
async oauthCallback(@Query('code') code: string, @Res() res: any) {
  if (!code) throw new BadRequestException('Missing OAuth code');

  const { data, error } = await supabase.auth.exchangeCodeForSession(code);
  if (error) throw new BadRequestException(error.message);

  const supabaseUser = data.user;

  const user = await this.userRepository.ensureUserExists({
    email: supabaseUser.email!,
    providerId: supabaseUser.id,
    provider: supabaseUser.app_metadata.provider || 'google',
    name: supabaseUser.user_metadata.full_name,
  });

  const token = this.jwtService.sign({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return res.json({
    message: 'Login successful',
    token,
    user,
  });
}
}






