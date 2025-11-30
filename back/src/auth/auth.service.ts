import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { RegisterUserDto } from './DTOs/register-user.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import LoginUserDto from './DTOs/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginUserDto) {
  const { email, password } = dto;
  const user = await this.usersService.findByEmailOrNull(email);

  if (!user || !user.isActive) {
    throw new BadRequestException('Invalid email or password');
  }

  // ❗ Handle OAuth users without password
  if (!user.password) {
    throw new BadRequestException(
      'This account uses social login. Please log in with Google or the provider you used.'
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
}
