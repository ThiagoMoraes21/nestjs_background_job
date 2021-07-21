import { CreateUserDto } from './create-user-dto';
import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('create-user')
export class CreateUserController {

    constructor(private mailService: MailerService) {}

    @Post()
    async createUser(@Body() createUser: CreateUserDto): Promise<void> {
        await this.mailService.sendMail({
            to: createUser.email,
            from: 'Equipe Code/Drops <codedropgs@codedrops.com.br>',
            subject: 'Seja Bem Vindo',
            text: `Olá, ${createUser.name}, seu cadastro foi realizado com sucesso. Seja bem vindo(a)!`
        });
    }
}
