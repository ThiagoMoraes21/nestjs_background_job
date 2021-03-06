import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueActive, OnQueueCompleted, OnQueueProgress, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { CreateUserDto } from 'src/create-user/create-user-dto';

@Processor('sendMail-queue')
export class SendMailConsumer {
    private readonly logger = new Logger(SendMailConsumer.name);

    constructor(private mailService: MailerService) {}
    
    @Process('sendMail-job')
    async sendMailJob(job: Job<CreateUserDto>): Promise<void> {
        const { data } = job;
        
        await this.mailService.sendMail({
            to: data.email,
            from: 'Equipe code drops <codedrops@codedrops.com.br',
            subject: 'Seja bem vindo!',
            text: `Olá ${data.name}, seu cadastro foi realizado com sucesso.Seja bem vindo(a)!`
        });
    }

    @OnQueueCompleted() 
    onCompleted(job: Job) {
        this.logger.debug(`Transcoding completed - ${job.name}`);
    }

    @OnQueueActive() 
    onQueueActive(job: Job) {
        this.logger.debug('Start transcoding...');
        this.logger.debug(job.data);
    }
}