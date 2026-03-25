import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { Outbox } from 'src/domain/entity/outbox.entity';
import { User } from 'src/domain/entity/user.entity';
import { PublisherService } from 'src/infra/rabbitMq/publisher';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateConnectionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly publishService: PublisherService
  ) {}

  async updateConnection(userId: string, otherUserId: string) {
    if (!userId || !otherUserId) {
      throw new BadRequestException('User is missing');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepo = queryRunner.manager.getRepository(User);
      const connectionRepo = queryRunner.manager.getRepository(Connection);
      const outboxRepo = queryRunner.manager.getRepository(Outbox);

      const user = await userRepo.findOne({ where: { id: userId } });
      const otherUser = await userRepo.findOne({ where: { id: otherUserId } });

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

      const outbox = outboxRepo.create({
        message: {
          senderId: user.id,
          senderName: user.firstName,
          senderImage: user.profilePicture,
          receiverId: otherUser.id,
          type: 'CONNECTION_ACCEPT',
          message: `${user.firstName} accepted your connection request`,
        },
      });

      await outboxRepo.save(outbox);

      await queryRunner.commitTransaction();

      return {
        message: `${user.firstName} accepted request of ${otherUser.firstName}`,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}