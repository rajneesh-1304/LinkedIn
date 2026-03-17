import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource, Not, In } from 'typeorm';

@Injectable()
export class GetConnectionService {
  constructor(private readonly dataSource: DataSource) {}

  async getSuggesstion(userId: string) {
    if (!userId) {
      throw new NotFoundException('User id is missing');
    }

    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);

    const connections = await connectionRepo.find({
      where: [
        { user: { id: userId }, status: ConnectionStatus.CONNECTED },
        { requester: { id: userId }, status: ConnectionStatus.CONNECTED },
      ],
      relations: ['user', 'requester'],
    });

    const connectedIds = connections.map((c) =>
      c.user.id === userId ? c.requester.id : c.user.id
    );

    const [users, total] = await userRepo.findAndCount({
      where: {
        id: Not(In([userId, ...connectedIds])),
      },
    });

    return {
      users,
      total,
    };
  }
}