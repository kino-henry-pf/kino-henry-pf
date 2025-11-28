import { Injectable, NotFoundException } from '@nestjs/common';
import UsersRepository from './users.repository';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll();
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    return user ?? this.notFound(id);
  }

  async findByEmailOrNull(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async create(data: Partial<User>): Promise<User> {
    return await this.usersRepository.createUser(data);
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.usersRepository.deleteUser(id);
    if (!user) this.notFound(id);
  }

  private notFound(indicator: string): never {
    throw new NotFoundException(`No user: ${indicator} has been found.`);
  }
}
