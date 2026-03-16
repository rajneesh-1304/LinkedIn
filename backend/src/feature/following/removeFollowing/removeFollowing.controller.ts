import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { RemoveFollowService } from './removeFollowing.service';


@Controller('follow')
export class RemoveFollowController {
  constructor(private readonly removeFollowService: RemoveFollowService) { }

  @UseGuards(FirebaseAuthGuard)
    @Post('remove/:id')
    removeFollowing(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.removeFollowService.removeFollowing(id, userId);
    }

}
