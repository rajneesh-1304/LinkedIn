import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { GetConnectionService } from './getPendingService';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class GetTotalConnectionController {
  constructor(private readonly getConnectinService: GetConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Get('all/:id')
    getTotalConnection(
      @Param('id') id: string,
    ){
      return this.getConnectinService.getSuggesstion(id);
    }

}



