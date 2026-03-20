import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { GetExperienceService } from './getExperience.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('profile')
export class GetExperienceController {
  constructor(private readonly getExperienceService: GetExperienceService) { }

  @UseGuards(JwtAuthGuard)
  @Get('experience/:id')
  getExperience(@Param('id') id: string){
    return this.getExperienceService.getExperience(id);
  }

}
