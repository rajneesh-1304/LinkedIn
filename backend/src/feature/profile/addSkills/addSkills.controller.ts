import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { EducationDto } from 'src/domain/DTO/education';
import { JwtAuthGuard } from 'src/jwt.guard';
import { AddSkillsService } from './addSkills.service';


@Controller('profile')
export class AddSkillsController {
  constructor(private readonly addSkillsService: AddSkillsService) { }

  @UseGuards(JwtAuthGuard)
    @Post('skills/:id')
    addSkills(
      @Param('id') id: string,
      @Body('skills') skills: any,
    ){
      return this.addSkillsService.addSkills(id, skills);
    }

}
