import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { AddConnectionService } from './addConnection.service';


@Controller('connection')
export class AddConnectionController {
  constructor(private readonly addConnectionService: AddConnectionService) { }

  @UseGuards(FirebaseAuthGuard)
    @Post('add/:id')
    addConnection(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.addConnectionService.addConnection(id, userId);
    }

}
