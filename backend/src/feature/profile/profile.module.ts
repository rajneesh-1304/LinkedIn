import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { AddEducationController } from './addEducation/addEducation.controller';
import { AddEducationService } from './addEducation/addEducation.service';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { AddExperienceController } from './addExperience/addExperience.controller';
import { GetEducationController } from './getEducation/getEducation.controller';
import { AddExperienceService } from './addExperience/addExperience.service';
import { GetEducationService } from './getEducation/getEducation.service';
import { GetExperienceController } from './getExperience/getExperience.controller';
import { GetExperienceService } from './getExperience/getExperience.service';
import { GetProfileController } from './getProfile/getProfile.controller';
import { GetProfileService } from './getProfile/getProfile.service';
import { GetProfilesController } from './getProfiles/getProfiles.controller';
import { GetProfilesService } from './getProfiles/getProfiles.service';
import { UpdateProfileController } from './updateProfile/updateProfile.controller';
import { UpdateProfileService } from './updateProfile/updateProfile.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddEducationController, AddExperienceController, GetEducationController, GetExperienceController, GetProfileController, GetProfilesController, UpdateProfileController],

  providers: [AddEducationService, AddExperienceService, GetEducationService, GetExperienceService, GetProfileService, GetProfilesService, RabbitConnection, UpdateProfileService, JwtAuthGuard, JwtService],
})
export class ProfileModule { }
