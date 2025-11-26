import { loginUserDTO } from 'src/users/dto/login-user-dto';
export declare class AuthService {
    private users;
    signup(user: any): Promise<any>;
    signin(credentials: loginUserDTO): Promise<string>;
}
