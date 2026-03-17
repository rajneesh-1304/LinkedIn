import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection } from 'src/domain/entity/connection.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RemoveConnectionService {
  constructor(private readonly dataSource: DataSource) {}

  async removeConnection(userId: string, otherUserId: string) {
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
        { user: { id: userId }, requester: { id: otherUserId } },
        { user: { id: otherUserId }, requester: { id: userId } },
      ],
    });

    if (!connection) {
      throw new NotFoundException('Connection not found');
    }

    await connectionRepo.remove(connection);

    return {
      message: `Connection removed of ${otherUser.firstName}`,
    };
  }
}