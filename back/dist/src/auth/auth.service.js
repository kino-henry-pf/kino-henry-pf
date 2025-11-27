"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
let AuthService = class AuthService {
    users = [
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
        }
    ];
    async signup(user) {
        const id = this.users.length + 1;
        const newUser = { id, ...user };
        this.users = [...this.users, newUser];
        return newUser;
    }
    async signin(credentials) {
        const foundUser = this.users.find(user => user.email === credentials.email);
        if (!foundUser)
            throw new common_1.NotFoundException("Bad credentials");
        const matchingPasswords = this.users.find(foundUser => foundUser.password === credentials.password);
        if (!matchingPasswords)
            throw new common_1.NotFoundException("Bad credentials");
        return "Logged.";
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map