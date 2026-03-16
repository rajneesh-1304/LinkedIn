import { Module } from '@nestjs/common';
import { RabbitConnection } from '../../infra/rabbitMq/rabbit.connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from 'src/domain/inbox.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inbox])],
  providers: [
    RabbitConnection,
  ],
  exports: [],
})
export class MessagingModule {}
