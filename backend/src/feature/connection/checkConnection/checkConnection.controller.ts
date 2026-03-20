import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { CheckConnectionService } from './checkConnection.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class CheckConnectionController {
  constructor(private readonly checkConnectionService: CheckConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Get('check/:id/connection/:userId')
    addConnection(
      @Param('id') id: string,
      @Param('userId') userId: string,
    ){
      return this.checkConnectionService.checkConnection(id, userId);
    }

}
