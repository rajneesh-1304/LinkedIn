import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { AddExperienceService } from './addExperience.service';
import { ExperienceDto } from 'src/domain/DTO/experience';


@Controller('profile')
export class AddExperienceController {
  constructor(private readonly addExperienceService: AddExperienceService) { }

  @UseGuards(FirebaseAuthGuard)
    @Post('experience/:id')
    addExperience(
      @Param('id') id: string,
      @Body() userData: ExperienceDto,
    ){
      return this.addExperienceService.addExperience(id, userData);
    }

}
