import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { CheckFollowingService } from './checkFollowing.service';


@Controller('follow')
export class CheckFollowingController {
  constructor(private readonly checkFollowingService: CheckFollowingService) { }

  @UseGuards(FirebaseAuthGuard)
    @Get('check/:id/following/:userId')
    addFollowing(
      @Param('id') id: string,
      @Param('userId') userId: string,
    ){
      return this.checkFollowingService.checkFollowing(id, userId);
    }

}
