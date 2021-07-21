import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { CreateUserDto } from 'src/create-user/create-user-dto';

@Injectable()
export class SendMailProducerService {

    constructor(@InjectQueue('sendMail-queue') private readonly queue: Queue) {}

    async sendMail(createUser: CreateUserDto): Promise<void> {
        await this.queue.add('sendMail-job', createUser);
    }
}