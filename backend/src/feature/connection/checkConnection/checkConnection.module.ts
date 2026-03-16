import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { CheckConnectionController } from './checkConnection.controller';
import { CheckConnectionService } from './checkConnection.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CheckConnectionController],
  providers: [CheckConnectionService, RabbitConnection],
})
export class CheckConnectionModule {}
