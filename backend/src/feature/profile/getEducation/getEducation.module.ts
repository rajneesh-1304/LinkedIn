import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { GetEducationController } from './getEducation.controller';
import { GetEducationService } from './getEducation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetEducationController
  ],
  providers: [GetEducationService, RabbitConnection],
})
export class GetEducationModule {}
