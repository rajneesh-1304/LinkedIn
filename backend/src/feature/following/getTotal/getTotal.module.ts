import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { TotalFollowingController } from './getTotal.controller';
import { TotalFollowingService } from './getTotal.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TotalFollowingController],
  providers: [TotalFollowingService, RabbitConnection],
})
export class TotalFollowModule {}
