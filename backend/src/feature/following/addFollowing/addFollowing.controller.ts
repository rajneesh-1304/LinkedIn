import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { AddFollowingService } from './addFollowing.service';


@Controller('follow')
export class AddFollowController {
  constructor(private readonly addFollowingService: AddFollowingService) { }

  @UseGuards(FirebaseAuthGuard)
    @Post('add/:id')
    addFollowing(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.addFollowingService.addFollowing(id, userId);
    }

}
