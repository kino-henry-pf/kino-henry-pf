import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users (Usuarios)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener Todos los usuarios'})
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener usuario mediante UUID'})
  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return await this.usersService.findById(id);
  }

  @ApiOperation({ summary: 'Eliminar usuario mediante UUID'})
  @Patch('/delete/:id')
  @HttpCode(204)
  async deleteUser(@Param('id') id: string) {
    return await this.usersService.deleteUser(id);
  }
}
