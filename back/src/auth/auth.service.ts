import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './DTOs/register-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import LoginUserDto from './DTOs/login-user.dto';
import UsersRepository from '../users/users.repository';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly userRepository: UsersRepository,
    @Inject('SUPABASE_CLIENT') private readonly supabase: SupabaseClient,
  ) {}

  async signin(dto: LoginUserDto) {
    const { email, password } = dto;
    const user = await this.usersService.findByEmailOrNull(email);

    if (!user || !user.isActive) {
      throw new BadRequestException('Invalid email or password');
    }

    // ❗ Handle OAuth users without password
    if (!user.password) {
      throw new BadRequestException(
        'This account uses social login. Please log in with Google or the provider you used.',
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(dto: RegisterUserDto) {
    if (dto.password !== dto.confirmPassword)
      throw new BadRequestException('Passwords do not match');

    const existing = await this.usersService.findByEmailOrNull(dto.email);

    if (existing) throw new ConflictException('Email is already registered');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const newUser = await this.usersService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      address: dto.address,
    });
    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  async promote(id: string) {
    return await this.usersService.promote(id);
  }

  async oauthCallback(code, res) {
    const { data, error } =
      await this.supabase.auth.exchangeCodeForSession(code);
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

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .redirect(
        'https://superlative-zabaione-f74f6b.netlify.app/oauth-success',
      );
  }

  async login(provider, res) {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: provider as any,
      options: {
        redirectTo: 'https://kino-henry-pf.onrender.com/auth/callback',
      },
    });

    if (error) return res.status(400).json(error);

    return res.redirect(data.url);
  }
}
