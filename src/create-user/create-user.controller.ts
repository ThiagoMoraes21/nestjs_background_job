import { CreateUserDto } from './create-user-dto';
import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SendMailProducerService } from 'src/jobs/sendMail-producer-service';

@Controller('create-user')
export class CreateUserController {

    constructor(private sendMailService: SendMailProducerService) {}

    @Post()
    createUser(@Body() createUser: CreateUserDto): void {
        this.sendMailService.sendMail(createUser);
    }
}
