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
export class AddConnectionService {
  constructor(private readonly dataSource: DataSource) { }

  async addConnection(id: string, userId: string) {
    const userRepo = this.dataSource.getRepository(User);
    const connectionRepo = this.dataSource.getRepository(Connection);
    if (!id || !userId) {
      throw new BadRequestException('User is missing');
    }
    const requester = await userRepo.findOne({ where: { id: id } });
    if (!requester) {
      throw new NotFoundException('Requesting user not found');
    }
    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPresent = await connectionRepo.findOne({ where: { userId: userId, requesterId: id } });
    if (isPresent) {
      throw new ConflictException('Already present Connection');
    }
    const connection = connectionRepo.create({
      userId: userId,
      requesterId: id,
      user,
      requester
    })
    await connectionRepo.save(connection);
    return {
      message: `Connection request sent to ${requester.firstName}`
    }
  }

}
