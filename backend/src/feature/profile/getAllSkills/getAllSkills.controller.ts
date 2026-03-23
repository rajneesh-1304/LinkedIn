import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { EducationDto } from 'src/domain/DTO/education';
import { JwtAuthGuard } from 'src/jwt.guard';
import { GetAllSkillsService } from './getAllSkills.service';


@Controller('profile')
export class GetAllSkillsController {
  constructor(private readonly getAllSkillsService: GetAllSkillsService) { }

  @UseGuards(JwtAuthGuard)
  @Get('allSkills')
  getAllSkills(
  ) {
    return this.getAllSkillsService.getAllSkills();
  }

}
