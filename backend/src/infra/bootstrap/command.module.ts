import { Module } from '@nestjs/common';
import { PublishCommand } from './command';
import { RabbitConnection } from '../rabbitMq/rabbit.connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../../data-source';
import { ConsumerService } from '../rabbitMq/consumer';
import { OutboxService } from 'src/feature/services/outbox.service';
import { OutboxModule } from 'src/feature/services/outbox.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...AppDataSource.options,
  }), 
  OutboxModule
],
  providers: [PublishCommand, RabbitConnection, ConsumerService, OutboxService],
})
export class Command { }
