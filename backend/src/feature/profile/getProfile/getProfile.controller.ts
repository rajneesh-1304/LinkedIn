import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { GetProfileService } from './getProfile.service';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';


@Controller('profile')
export class GetProfileController {
  constructor(private readonly getProfileService: GetProfileService) { }

  @UseGuards(FirebaseAuthGuard)
    @Get('profile/:id')
    getProfile(@Param('id') id: string){
      return this.getProfileService.getProfile(id);
    }

}
