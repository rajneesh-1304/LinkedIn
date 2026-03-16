import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { productImageStorage } from 'src/infra/multer/multer';
import { Profile } from 'src/domain/DTO/profile';
import { UpdateProfileService } from './updateProfile.service';

@Controller('profile')
export class UpdateProfileController {
  constructor(private readonly updateService: UpdateProfileService) { }

  @UseGuards(FirebaseAuthGuard)
    @Patch('update/:id')
    @UseInterceptors(
      FileInterceptor('image', {
        storage: productImageStorage,
      }),
    )
    updateProfile(
      @Param('id') id: string,
      @Body() userData: Profile,
      @UploadedFile() file?: Express.Multer.File,
    ) {
      return this.updateService.updateProfile(id, userData, file);
    }
}
