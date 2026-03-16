import { Module } from '@nestjs/common';
import { AddEducationModule } from './addEducation/addEducation.module';
import { AddExperienceModule } from './addExperience/addExperience.module';
import { GetEducationModule } from './getEducation/getEducation.module';
import { GetExperienceModule } from './getExperience/getExperience.module';
import { getProfilesModule } from './getProfiles/getProfiles.module';
import { UpdateProfileModule } from './updateProfile/updateProfile.module';
import { GetProfileModule } from './getProfile/getProfile.module';

@Module({
  imports: [
    AddEducationModule,
    AddExperienceModule,
    GetEducationModule,
    GetExperienceModule,
    getProfilesModule,
    UpdateProfileModule,
    GetProfileModule
  ],
})
export class ProfileModule {}
