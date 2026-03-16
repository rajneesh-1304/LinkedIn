import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { TotalFollowingService } from './getTotal.service';


@Controller('follow')
export class TotalFollowingController {
  constructor(private readonly totalFollowingService: TotalFollowingService) { }

  @UseGuards(FirebaseAuthGuard)
    @Get('total/:id')
    getTotalFollowing(
      @Param('id') id: string,
    ){
      return this.totalFollowingService.getTotalFollowing(id);
    }

}
