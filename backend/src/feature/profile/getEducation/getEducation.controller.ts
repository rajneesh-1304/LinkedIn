import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { GetEducationService } from './getEducation.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('profile')
export class GetEducationController {
  constructor(private readonly getEducationService: GetEducationService) { }

  @UseGuards(JwtAuthGuard)
  @Get('education/:id')
  getEducation(@Param('id') id: string){
    return this.getEducationService.getEducation(id);
  }

}
