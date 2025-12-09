import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, ROLE } from './entity/user.entity';
import { Repository } from 'typeorm';
import UpdateUserDto from './DTOs/update-user.dto';

@Injectable()
export default class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { isActive: true } });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email, isActive: true },
    });
  }

  async createUser(data: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(data);
    return this.usersRepository.save(newUser);
  }

  async deleteUser(id: string): Promise<User | null> {
    const user = await this.findAnyById(id);
    if (!user) return null;

    user.isActive = false;
    return this.usersRepository.save(user);
  }

  private async findAnyById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async promote(id: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    if (user.role === ROLE.ADMIN)
      throw new ConflictException('User is already an admin');
    user.role = ROLE.ADMIN;
    return await this.usersRepository.save(user);
  }

  async ensureUserExists(input: {
    email: string;
    providerId: string;
    provider: string;
    name?: string;
  }): Promise<User> {
    const { email, providerId, provider, name } = input;

    const user = await this.usersRepository.findOne({ where: { email } });

    if (user) {
      if (!user.providerId || !user.provider) {
        user.providerId = providerId;
        user.provider = provider;
        await this.usersRepository.save(user);
      }
      return user;
    }

    const newUser = this.usersRepository.create({
      email,
      name: name || null,
      providerId,
      provider,
      password: null,
      address: null,
      role: ROLE.USER,
      isActive: true,
    } as Partial<User>);

    return this.usersRepository.save(newUser);
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;
    const updated = Object.assign(user, dto);
    await this.usersRepository.save(updated);
    return this.findById(id);
  }
}
