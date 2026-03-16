import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { GetExperienceController } from './getExperience.controller';
import { GetExperienceService } from './getExperience.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetExperienceController
  ],
  providers: [GetExperienceService, RabbitConnection],
})
export class GetExperienceModule {}
