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
export class CheckConnectionService {
  constructor(private readonly dataSource: DataSource) { }

  async checkConnection(id: string, userId: string) {
    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);
    if (!id || !userId) {
      throw new BadRequestException('User is missing');
    }
    const requester = await userRepo.findOne({ where: { id: id } });
    if (!requester) {
      throw new NotFoundException('Requested user not found');
    }
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPresent = await connectionRepo.findOne({ where: { userId: userId, requesterId: id } });
    if (!isPresent) {
      return {
        status: 'NONE'
      }
    }
    return {
      status: isPresent.status,
    }
  }
}
