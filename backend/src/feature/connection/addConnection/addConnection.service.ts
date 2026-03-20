import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/entity/user.entity';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { Outbox } from 'src/domain/entity/outbox.entity';

@Injectable()
export class AddConnectionService {
  constructor(private readonly dataSource: DataSource) {}

  async addConnection(requesterId: string, userId: string) {
    if (!userId || !requesterId) {
      throw new BadRequestException('User ID or Requester ID is missing');
    }

    if (userId === requesterId) {
      throw new BadRequestException("You can't connect with yourself");
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepo = queryRunner.manager.getRepository(User);
      const connectionRepo = queryRunner.manager.getRepository(Connection);
      const outboxRepo = queryRunner.manager.getRepository(Outbox);

      const [user, requester] = await Promise.all([
        userRepo.findOne({ where: { id: userId } }),
        userRepo.findOne({ where: { id: requesterId } }),
      ]);

      if (!user) throw new NotFoundException('User not found');
      if (!requester) throw new NotFoundException('Requester not found');

      const existingConnection = await connectionRepo.findOne({
        where: [
          { user: { id: userId }, requester: { id: requesterId } },
          { user: { id: requesterId }, requester: { id: userId } },
        ],
      });

      if (existingConnection) {
        throw new ConflictException('Connection already exists or is pending');
      }

      const connection = connectionRepo.create({
        user,
        requester,
        status: ConnectionStatus.PENDING,
      });

      await connectionRepo.save(connection);
      await userRepo.increment({ id: userId }, 'totalConnections', 1);
      await userRepo.increment({ id: requesterId }, 'totalConnections', 1);

      const outbox = outboxRepo.create({
        message: {
          senderId: requester.id,
          senderName: requester.firstName,
          receiverId: user.id,
          type: 'CONNECTION_REQUEST',
          message: `${requester.firstName} sent you a connection request`,
        },
        
      });

      await outboxRepo.save(outbox);

      await queryRunner.commitTransaction();

      return {
        message: `${requester.firstName} sent a connection request to ${user.firstName}`,
        connectionId: connection.id,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}