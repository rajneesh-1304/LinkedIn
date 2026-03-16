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
export class TotalConnectionService {
  constructor(private readonly dataSource: DataSource) { }

  async getTotalConnection(id: string) {
  const userRepo = this.dataSource.getRepository(User);
  const connectionRepo = this.dataSource.getRepository(Connection);

  if (!id) {
    throw new BadRequestException('User is missing');
  }

  const requester = await userRepo.findOne({ where: { id } });

  if (!requester) {
    throw new NotFoundException('Requesting user not found');
  }

  const total = await connectionRepo.count({
    where: { requesterId: id },
  });

  return total;
}

}
