import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entity/user.entity';
import { SupabaseModule } from '../supabase/supabase.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User]), SupabaseModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
