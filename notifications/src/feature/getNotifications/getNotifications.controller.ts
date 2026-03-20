import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { GetNotificationsService } from './getNotifications.service';
import { JwtAuthGuard } from 'src/jwt.guard';


@Controller('notifications')
export class GetNotificationController {
  constructor(private readonly getNotificationsService: GetNotificationsService) { }

  @UseGuards(JwtAuthGuard)
    @Get(':id')
    getNotifications(
      @Param('id') id: string,
    ){
      return this.getNotificationsService.getNotification(id);
    }

}
