import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class TotalConnectionService {
  constructor(private readonly dataSource: DataSource) {}

  async getTotalConnection(userId: string) {
    if (!userId) {
      throw new BadRequestException('User is missing');
    }

    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const total = await connectionRepo.count({
      where: [
        { user: { id: userId }, status: ConnectionStatus.CONNECTED },
        { requester: { id: userId }, status: ConnectionStatus.CONNECTED },
      ],
    });

    return total;
  }
}