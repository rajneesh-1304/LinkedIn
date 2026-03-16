import { Module } from '@nestjs/common';
import { PublishCommand } from './command';
import { RabbitConnection } from '../rabbitMq/rabbit.connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../../data-source';
// import { ConsumerService } from 'src/messaging/consumer.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...AppDataSource.options,
  }), 
],
  providers: [PublishCommand, RabbitConnection],
})
export class Command { }
