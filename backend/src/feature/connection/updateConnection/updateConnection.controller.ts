import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { UpdateConnectionService } from './updateConnection.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('connection')
export class UpdateConnectionController {
  constructor(private readonly updateConnectionService: UpdateConnectionService) { }

  @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    updateConnection(
      @Param('id') id: string,
      @Body('userId') userId: string,
    ){
      return this.updateConnectionService.updateConnection(id, userId);
    }

}
