import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { AddExperienceController } from './addExperience.controller';
import { AddExperienceService } from './addExperience.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddExperienceController],
  providers: [AddExperienceService, RabbitConnection],
})
export class AddExperienceModule {}
