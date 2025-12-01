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
  Inject,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './DTOs/login-user.dto';
import { RegisterUserDto } from './DTOs/register-user.dto';
import UsersRepository from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import type { Provider } from '@supabase/auth-js';
import { Roles } from 'src/decorator/role.decorator';
import { AuthGuard } from './guards/auth-guard.guard';
import { RolesGuard } from './guards/role-guard.guard';
import { SupabaseClient } from '@supabase/supabase-js';
import type { Response } from 'express';

interface SupabaseOAuthMetadata {
  full_name?: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UsersRepository,
    private readonly jwtService: JwtService,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
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
  async login(@Query('provider') provider: string, @Res() res: Response) {
    if (!provider) provider = 'google';

    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: provider as Provider,
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
    if (error) return res.status(400).json({ message: error.message });

    return res.redirect(data.url);
  }

  @Get('callback')
  async oauthCallback(@Query('code') code: string, @Res() res: Response) {
    if (!code) throw new BadRequestException('Missing OAuth code');

    const { data, error } =
      await this.supabase.auth.exchangeCodeForSession(code);
    if (error) throw new BadRequestException(error.message);

    const supabaseUser = data.user;

    const metadata = supabaseUser.user_metadata as SupabaseOAuthMetadata;

    const user = await this.userRepository.ensureUserExists({
      email: supabaseUser.email!,
      providerId: supabaseUser.id,
      provider: supabaseUser.app_metadata.provider || 'google',
      name: metadata.full_name ?? 'Unknown',
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

  @Patch('/users/:id/promote')
  @Roles('admin')
  @UseGuards(AuthGuard, RolesGuard)
  async promote(@Param('id') id: string) {
    return await this.authService.promote(id);
  }
}
