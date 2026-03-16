import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection, ConnectionStatus } from 'src/domain/entity/connection.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateConnectionService {
  constructor(private readonly dataSource: DataSource) { }

  async updateConnection(id: string, userId: string) {
    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);
    if (!id || !userId) {
      throw new BadRequestException('User is missing');
    }
    const requester = await userRepo.findOne({ where: { id: userId } });
    if (!requester) {
      throw new NotFoundException('Requesting user not found');
    }
    const user = await userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPresent = await connectionRepo.findOne({ where: { userId: userId, requesterId: id } });
    if (!isPresent) {
      throw new NotFoundException('Connection not found');
    }
    await connectionRepo.update({id: isPresent.id},{status: ConnectionStatus.CONNECTED});
    return {
      message: `${user.firstName} accepted request of ${requester.firstName}`,
    }
  }

}
