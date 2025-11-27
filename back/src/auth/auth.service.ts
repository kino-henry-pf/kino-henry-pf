import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginUserDTO } from 'src/users/dto/login-user-dto';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>){}
async signup(user: CreateUserDto) {
    const newUser = this.usersRepository.create(user);
    return await this.usersRepository.save(newUser);}
async signin(credentials: loginUserDTO){
   const foundUser = this.usersRepository.findOneBy({email: credentials.email});
   if (!foundUser) throw new NotFoundException("Bad credentials")
   const matchingPasswords = this.usersRepository.findOneBy({password: credentials.password})
   if (!matchingPasswords) throw new NotFoundException("Bad credentials")
   return "Logged."
}
}
