import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { RemoveConnectionService } from './removeConnection.service';


@Controller('connection')
export class RemoveConnectionController {
  constructor(private readonly removeConnectionService: RemoveConnectionService) { }

  @UseGuards(FirebaseAuthGuard)
    @Post('remove/:id')
    removeConnection(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.removeConnectionService.removeConnection(id, userId);
    }

}
