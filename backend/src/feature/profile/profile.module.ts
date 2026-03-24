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
import { AddSkillsController } from './addSkills/addSkills.controller';
import { AddSkillsService } from './addSkills/addSkills.service';
import { GetSkillsController } from './getSkills/getSkills.controller';
import { GetSkillsService } from './getSkills/getSkills.service';
import { GetAllSkillsController } from './getAllSkills/getAllSkills.controller';
import { GetAllSkillsService } from './getAllSkills/getAllSkills.service';
import { GetProfileBySearchController } from './getProfileBySearch/getProfileBySearch.controller';
import { GetProfileBySearchService } from './getProfileBySearch/getProfileBySearch.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AddEducationController, AddExperienceController, GetEducationController, GetExperienceController, GetProfileController, GetProfilesController, UpdateProfileController, AddSkillsController, GetSkillsController, GetAllSkillsController, GetProfileBySearchController],

  providers: [AddEducationService, AddExperienceService, GetEducationService, GetExperienceService, GetProfileService, GetProfilesService, RabbitConnection, UpdateProfileService, AddSkillsService, GetSkillsService, GetAllSkillsService, GetProfileBySearchService, JwtAuthGuard, JwtService],
})
export class ProfileModule { }
