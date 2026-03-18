import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { User } from 'src/domain/entity/user.entity';
import { PublisherService } from 'src/infra/rabbitMq/publisher';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateConnectionService {
  constructor(private readonly dataSource: DataSource, private readonly publishService: PublisherService) {}

  async updateConnection(userId: string, otherUserId: string) {
    if (!userId || !otherUserId) {
      throw new BadRequestException('User is missing');
    }

    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);

    const [user, otherUser] = await Promise.all([
      userRepo.findOne({ where: { id: userId } }),
      userRepo.findOne({ where: { id: otherUserId } }),
    ]);

    if (!user) throw new NotFoundException('User not found');
    if (!otherUser) throw new NotFoundException('Other user not found');

    const connection = await connectionRepo.findOne({
      where: [
        { user: { id: userId }, requester: { id: otherUserId }, status: ConnectionStatus.PENDING },
        { user: { id: otherUserId }, requester: { id: userId }, status: ConnectionStatus.PENDING },
      ],
    });

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    connection.status = ConnectionStatus.CONNECTED;
    await connectionRepo.save(connection);
    this.publishService.publish({
      id: `${userId}_${otherUserId}`,
      senderId: userId,
      receiverId: otherUserId,
      senderName: user.firstName,
      type: 'REQUEST_ACCEPTED',
      handler: 'ACCEPT_REQUEST',
      message: `${user.firstName} accepted your request.`
      
    })

    return {
      message: `${user.firstName} accepted request of ${otherUser.firstName}`,
    };
  }
}