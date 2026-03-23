import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt.guard';
import { Message } from 'src/domain/entity/message';
import { MessageGateway } from './gateway';
import { MessagesController } from './message.controller';
import { MessagesService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), ],
  controllers: [ MessagesController
  ],
  providers: [
    MessageGateway, MessagesService, JwtAuthGuard, JwtService
  ],
})
export class MessageModule {}
