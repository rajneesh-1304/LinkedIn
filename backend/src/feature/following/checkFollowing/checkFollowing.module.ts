import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { CheckFollowingController } from './checkFollowing.controller';
import { CheckFollowingService } from './checkFollowing.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [CheckFollowingController],
  providers: [CheckFollowingService, RabbitConnection],
})
export class CheckFollowModule {}
