import { CreateUserDto } from './create-user.dto';
declare const loginUserDTO_base: import("@nestjs/mapped-types").MappedType<Pick<CreateUserDto, "email" | "password">>;
export declare class loginUserDTO extends loginUserDTO_base {
    email: string;
    password: string;
}
export {};
