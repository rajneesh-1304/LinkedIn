import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase-auth.guard';
import { GetNotificationsService } from './getNotifications.service';


@Controller('notifications')
export class GetNotificationController {
  constructor(private readonly getNotificationsService: GetNotificationsService) { }

  @UseGuards(FirebaseAuthGuard)
    @Get(':id')
    getNotifications(
      @Param('id') id: string,
    ){
      return this.getNotificationsService.getNotification(id);
    }

}
