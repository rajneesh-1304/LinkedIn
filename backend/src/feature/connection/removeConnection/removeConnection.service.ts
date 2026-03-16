import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Connection } from 'src/domain/entity/connection.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RemoveConnectionService {
  constructor(private readonly dataSource: DataSource) { }

  async removeConnection(id: string, userId: string) {
    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);
    if (!id || !userId) {
      throw new BadRequestException('User is missing');
    }
    const requester = await userRepo.findOne({ where: { id } });
    if (!requester) {
      throw new NotFoundException('Requesting user not found');
    }
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPresent = await connectionRepo.findOne({ where: { userId: userId, requesterId: id } });
    if (!isPresent) {
    throw new NotFoundException('Connection not found');
    }
    await connectionRepo.remove(isPresent);
    return {
      message: `Connection removed of ${requester.firstName}`
    }
  }

}
