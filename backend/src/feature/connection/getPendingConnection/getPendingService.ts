import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetPendingConnectionService {
  constructor(private readonly dataSource: DataSource) {}

  async getPendingConnection(userId: string) {
    if (!userId) {
      throw new NotFoundException('User id is missing');
    }

    const connectionRepo = this.dataSource.getRepository(Connection);

    const connections = await connectionRepo.find({
      where: [
        { user: { id: userId }, status: ConnectionStatus.PENDING },
      ],
      relations: ['user', 'requester'],
    });

    const users = connections.map((c) =>
      c.user.id === userId ? c.requester : c.user
    );

    return {
      users,
      total: users.length,
    };
  }
}