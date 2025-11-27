import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { loginUserDTO } from 'src/users/dto/login-user-dto';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    signup(user: CreateUserDto): Promise<User>;
    signin(credentials: loginUserDTO): Promise<string>;
}
