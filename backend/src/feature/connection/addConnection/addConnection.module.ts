import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { AddConnectionController } from './addConnection.controller';
import { AddConnectionService } from './addConnection.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddConnectionController],
  providers: [AddConnectionService, RabbitConnection],
})
export class AddConnectionModule {}
