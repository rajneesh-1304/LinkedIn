import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Follow } from 'src/domain/entity/follow.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class RemoveFollowService {
  constructor(private readonly dataSource: DataSource) {}

  async removeFollowing(id: string, userId: string) {
    if (!id || !userId) {
      throw new BadRequestException('User is missing');
    }

    const userRepo = this.dataSource.getRepository(User);
    const followRepo = this.dataSource.getRepository(Follow);

    const user = await userRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const follower = await userRepo.findOne({ where: { id: id } });
    if (!follower) {
      throw new NotFoundException('Follower not found');
    }

    const followRecord = await followRepo.findOne({ where: { userId: userId, followerId: id } });
    if (!followRecord) {
      throw new ConflictException('Not present in follower list');
    }

    await followRepo.remove(followRecord);

    return {
      message: `${follower.firstName} unfollowed ${user.firstName}`,
    };
  }
}