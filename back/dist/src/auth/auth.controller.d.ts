import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginUserDTO } from 'src/users/dto/login-user-dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(user: CreateUserDto): Promise<import("../users/entity/user.entity").User>;
    signin(credentials: loginUserDTO): Promise<string>;
}
