import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from 'src/domain/entity/inbox.entity';
import { Notification } from 'src/domain/entity/notification.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { GetNotificationController } from './getNotifications/getNotifications.controller';
import { GetNotificationsService } from './getNotifications/getNotifications.service';
@Module({
  imports: [TypeOrmModule.forFeature([Notification, Inbox])],
  controllers: [GetNotificationController
  ],
  providers: [GetNotificationsService, RabbitConnection],
})
export class NotificationsModule {}