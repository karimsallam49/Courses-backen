
import { Module } from '@nestjs/common';
import { AiServices } from './AI.services';
import { AiController } from './Ai.Controller';
import { UserModule } from 'src/Users/user.module';

@Module({
  providers: [AiServices],
  controllers: [AiController],
  imports:[
    UserModule
  ]
})
export class AiModule {}