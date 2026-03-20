import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { RemoveConnectionService } from './removeConnection.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class RemoveConnectionController {
  constructor(private readonly removeConnectionService: RemoveConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Post('remove/:id')
    removeConnection(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.removeConnectionService.removeConnection(id, userId);
    }

}
