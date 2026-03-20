import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { GetPendingConnectionService } from './getPendingService';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class GetPendingConnectionController {
  constructor(private readonly getPendingConnectionService: GetPendingConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Get('pending/:id')
    getTotalConnection(
      @Param('id') id: string,
    ){
      return this.getPendingConnectionService.getPendingConnection(id);
    }

}



