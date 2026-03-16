import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { RemoveFollowController } from './removeFollowing.controller';
import { RemoveFollowService } from './removeFollowing.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [RemoveFollowController],
  providers: [RemoveFollowService, RabbitConnection],
})
export class RemoveFollowModule {}
