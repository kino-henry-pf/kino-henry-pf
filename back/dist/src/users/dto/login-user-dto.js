"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const mapped_types_1 = require("@nestjs/mapped-types");
const create_user_dto_1 = require("./create-user.dto");
class loginUserDTO extends (0, mapped_types_1.PickType)(create_user_dto_1.CreateUserDto, ['email', 'password']) {
    email;
    password;
}
exports.loginUserDTO = loginUserDTO;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'juanperez@mail.com',
        description: 'Correo electrónico válido',
    }),
    __metadata("design:type", String)
], loginUserDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Passw0rd!',
        description: 'Contraseña del usuario',
    }),
    __metadata("design:type", String)
], loginUserDTO.prototype, "password", void 0);
//# sourceMappingURL=login-user-dto.js.map