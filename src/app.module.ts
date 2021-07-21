import { CreateUserController } from './create-user/create-user.controller';
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { SendMailProducerService } from './jobs/sendMail-producer-service';
import { SendMailConsumer } from './jobs/sendMail-consumer';

@Module({
    imports: [
        ConfigModule.forRoot(),
        BullModule.forRoot({
            redis: {
                host: 'localhost',
                port: 6379,
            },
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.MAIL_HOST,
                port: Number(process.env.MAIL_PORT),
                auth: {
                    user: process.env.MAIL_USER,
                    pass: process.env.MAIL_PASS
                }
            }
        }),
        BullModule.registerQueue({
            name: 'sendMail-queue'
        })
    ],
    controllers: [
        CreateUserController
    ],
    providers: [
        SendMailProducerService,
        SendMailConsumer
    ],
})
export class AppModule { }
