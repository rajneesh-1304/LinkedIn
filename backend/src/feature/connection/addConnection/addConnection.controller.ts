import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { AddConnectionService } from './addConnection.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class AddConnectionController {
  constructor(private readonly addConnectionService: AddConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Post('add/:id')
    addConnection(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.addConnectionService.addConnection(id, userId);
    }

}
