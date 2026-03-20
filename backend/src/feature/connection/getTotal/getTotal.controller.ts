import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards, Delete } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { TotalConnectionService } from './getTotal.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class TotalConnectionController {
  constructor(private readonly totalConnectionService: TotalConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Get('total/:id')
    getTotalConnection(
      @Param('id') id: string,
    ){
      return this.totalConnectionService.getTotalConnection(id);
    }

}
