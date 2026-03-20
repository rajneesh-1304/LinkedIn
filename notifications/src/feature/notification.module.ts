import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from 'src/domain/entity/inbox.entity';
import { Notification } from 'src/domain/entity/notification.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { GetNotificationController } from './getNotifications/getNotifications.controller';
import { GetNotificationsService } from './getNotifications/getNotifications.service';
import { JwtAuthGuard } from 'src/jwt.guard';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Notification, Inbox])],
  controllers: [GetNotificationController
  ],
  providers: [GetNotificationsService, RabbitConnection, JwtAuthGuard, JwtService],
})
export class NotificationsModule {}