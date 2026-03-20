import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { AddEducationService } from './addEducation.service';
import { EducationDto } from 'src/domain/DTO/education';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('profile')
export class AddEducationController {
  constructor(private readonly addEducationService: AddEducationService) { }

  @UseGuards(JwtAuthGuard)
    @Post('education/:id')
    addEducation(
      @Param('id') id: string,
      @Body() userData: EducationDto,
    ){
      return this.addEducationService.addEducation(id, userData);
    }

}
