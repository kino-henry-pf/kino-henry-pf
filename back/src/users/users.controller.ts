import { Controller, Get, HttpCode, Param, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entity/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role.decorator';
//import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
//import { RolesGuard } from 'src/auth/guards/role-guard.guard';

@ApiTags('users (Usuarios)')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Obtener Todos los usuarios'})
  @ApiBearerAuth()
  @Get()
  // @Roles('admin')
  // @UseGuards(AuthGuard, RolesGuard)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Obtener usuario mediante UUID'})
  @ApiBearerAuth()
  @Get(':id')
  // @UseGuards(AuthGuard)
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
