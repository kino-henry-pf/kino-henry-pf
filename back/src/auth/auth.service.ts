import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { loginUserDTO } from '../users/dto/login-user-dto';
import { User } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}
  async signup(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);
  }
  async signin(credentials: loginUserDTO) {
    const foundUser = await this.usersRepository.findOneBy({
      email: credentials.email,
    });
    if (!foundUser) throw new NotFoundException('Bad credentials');
    const matchingPasswords = await bcrypt.compare(
      credentials.password,
      foundUser.password,
    );
    if (!matchingPasswords) throw new NotFoundException('Bad credentials');
    const payload = {
      id: foundUser.id,
      roles: foundUser.roles,
    };
    const token = this.jwtService.sign(payload);
    return { login: true, access_token: token };
  }
}
