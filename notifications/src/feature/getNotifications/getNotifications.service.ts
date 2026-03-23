import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Notification } from 'src/domain/entity/notification.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetNotificationsService {
  constructor(private readonly dataSource: DataSource) { }

  async getNotification(id: string) {
    const notificationRepo = this.dataSource.getRepository(Notification);
    if (!id) {
      throw new BadRequestException('User is missing');
    }
    
    const notifications = (await notificationRepo.find({ where: { receiverId: id }, order: {createdAt: 'DESC'} }))
    return {
      notifications
    }
  }

}
