import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { AddEducationController } from './addEducation.controller';
import { AddEducationService } from './addEducation.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddEducationController],
  providers: [AddEducationService, RabbitConnection],
})
export class AddEducationModule {}
