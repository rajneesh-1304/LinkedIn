import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { AddExperienceService } from './addExperience.service';
import { ExperienceDto } from 'src/domain/DTO/experience';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('profile')
export class AddExperienceController {
  constructor(private readonly addExperienceService: AddExperienceService) { }

  @UseGuards(JwtAuthGuard)
    @Post('experience/:id')
    addExperience(
      @Param('id') id: string,
      @Body() userData: ExperienceDto,
    ){
      return this.addExperienceService.addExperience(id, userData);
    }

}
