import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { UpdateConnectionController } from './updateConnection.controller';
import { UpdateConnectionService } from './updateConnection.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UpdateConnectionController],
  providers: [UpdateConnectionService, RabbitConnection],
})
export class UpdateConnectionModule {}
