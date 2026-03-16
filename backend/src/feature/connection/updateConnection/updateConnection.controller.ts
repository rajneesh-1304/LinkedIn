import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { UpdateConnectionService } from './updateConnection.service';


@Controller('connection')
export class UpdateConnectionController {
  constructor(private readonly updateConnectionService: UpdateConnectionService) { }

  @UseGuards(FirebaseAuthGuard)
    @Patch('update/:id')
    updateConnection(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.updateConnectionService.updateConnection(id, userId);
    }

}
