import { Module } from '@nestjs/common';
import { PublishCommand } from './command';
import { RabbitConnection } from '../rabbitMq/rabbit.connection';
import { TypeOrmModule } from '@nestjs/typeorm';
import AppDataSource from '../../data-source';
import { ConsumerService } from '../rabbitMq/consumer';

@Module({
  imports: [TypeOrmModule.forRoot({
    ...AppDataSource.options,
  }), 
],
  providers: [PublishCommand, RabbitConnection, ConsumerService],
})
export class Command { }
