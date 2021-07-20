import { CreateUserController } from './create-user/create-user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [
    CreateUserController
  ],
  providers: [],
})
export class AppModule {}
