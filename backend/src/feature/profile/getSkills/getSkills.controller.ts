import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { EducationDto } from 'src/domain/DTO/education';
import { JwtAuthGuard } from 'src/jwt.guard';
import { GetSkillsService } from './getSkills.service';


@Controller('profile')
export class GetSkillsController {
  constructor(private readonly getSkillsService: GetSkillsService) { }

  @UseGuards(JwtAuthGuard)
  @Get('skills/:id')
  getSkills(
    @Param('id') id: string,
  ) {
    return this.getSkillsService.getSkills(id);
  }

}
