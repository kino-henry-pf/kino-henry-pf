import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private users;
    create(user: CreateUserDto): CreateUserDto;
    findAll(): {
        id: string;
        name: string;
        email: string;
        password: string;
        address: string;
    }[];
    findOne(id: string): {
        id: string;
        name: string;
        email: string;
        password: string;
        address: string;
    };
    update(id: string, updateUserDto: UpdateUserDto): string;
    remove(id: number): string;
}
