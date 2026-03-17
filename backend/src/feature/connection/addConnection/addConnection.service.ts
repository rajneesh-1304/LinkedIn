import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/entity/user.entity';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';

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

    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);

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

    return {
      message: `${requester.firstName} sent a connection request to ${user.firstName}`,
      connectionId: connection.id,
    };
  }
}