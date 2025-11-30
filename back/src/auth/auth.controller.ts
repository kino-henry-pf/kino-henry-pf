import { Controller, Post, Body, HttpCode, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import LoginUserDto from './DTOs/login-user.dto';
import { RegisterUserDto } from './DTOs/register-user.dto';
import { supabase } from 'config/supabase.client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  signup(@Body() dto: RegisterUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  signin(@Body() dto: LoginUserDto) {
    return this.authService.login(dto);
  }

//   @Get('login') 
//   async login(@Query('provider') provider: string, @Res() res) { 
//     const { data, error } = await supabase.auth.signInWithOAuth({ 
//       provider: "google",
//       options: { redirectTo: 'http://localhost:3000/auth/callback', 
//   }, 
// }); if (error) return res.status(400).json(error); return res.redirect(data.url); } 

// @Get('callback') 
// async callback(@Query('code') code: string) { 
//   const { data, error } = await supabase.auth.exchangeCodeForSession(code); 
//   if (error) throw error; // data contains user + access_token + refresh_token 
//   return data; 
// } 

}

