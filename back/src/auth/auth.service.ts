import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginUserDTO } from 'src/users/dto/login-user-dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  private users = [
      {
    id: "1",
    name: "Lucía Martínez",
    email: "lucia.martinez@example.com",
    password: "Passw0rd!1",
    address: "Calle Luna 123, Madrid"
  },
  {
    id: "2",
    name: "Carlos Pérez",
    email: "carlos.perez@example.com",
    password: "SecurePass22",
    address: "Avenida del Sol 45, Barcelona"
  },
  {
    id: "3",
    name: "María González",
    email: "maria.gonzalez@example.com",
    password: "MyPwd#333",
    address: "Calle Mayor 78, Valencia"
  },
  {
    id: "4",
    name: "Javier López",
    email: "javier.lopez@example.com",
    password: "ClaveSegura44",
    address: "Calle Río Verde 12, Sevilla"
  },
  {
    id: "5",
    name: "Ana Torres",
    email: "ana.torres@example.com",
    password: "PwdAna55!",
    address: "Paseo de la Paz 90, Zaragoza"
  },
  {
    id: "6",
    name: "Diego Ruiz",
    email: "diego.ruiz@example.com",
    password: "DiegoPwd66",
    address: "Calle Jardín 5, Bilbao"
  },
  {
    id: "7",
    name: "Laura Fernández",
    email: "laura.fernandez@example.com",
    password: "LauraPass77",
    address: "Calle Primavera 33, Málaga"
  },
  {
    id: "8",
    name: "Sergio Ramírez",
    email: "sergio.ramirez@example.com",
    password: "SRamirez88*",
    address: "Avenida Centro 101, Murcia"
  },
  {
    id: "9",
    name: "Paula Sánchez",
    email: "paula.sanchez@example.com",
    password: "PaulaSecure99",
    address: "Calle Norte 8, Valladolid"
  },
  {
    id: "10",
    name: "Hugo Castro",
    email: "hugo.castro@example.com",
    password: "HugoPass100!",
    address: "Boulevard del Mar 60, Alicante"
  }]
async signup(user) {
      const id = this.users.length + 1
      const newUser = {id, ...user} 
      this.users = [...this.users, newUser]
      return newUser}
async signin(credentials: loginUserDTO){
   const foundUser = this.users.find(user => user.email === credentials.email);
   if (!foundUser) throw new NotFoundException("Bad credentials")
   const matchingPasswords = this.users.find(foundUser => foundUser.password === credentials.password)
   if (!matchingPasswords) throw new NotFoundException("Bad credentials")
   return "Logged."
}
}
