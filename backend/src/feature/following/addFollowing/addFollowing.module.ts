import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { AddFollowController } from './addFollowing.controller';
import { AddFollowingService } from './addFollowing.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddFollowController],
  providers: [AddFollowingService, RabbitConnection],
})
export class AddFollowModule {}
