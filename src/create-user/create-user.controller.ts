import { CreateUserDto } from './create-user-dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('create-user')
export class CreateUserController {

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return createUserDto;
    }
}
