import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Follow } from 'src/domain/entity/follow.entity';
import { User } from 'src/domain/entity/user.entity';

@Injectable()
export class AddFollowingService {
  constructor(private readonly dataSource: DataSource) {}

  async addFollowing(followerId: string, userId: string) {
    if (!userId || !followerId) {
      throw new BadRequestException('User ID or Follower ID is missing');
    }

    if (userId === followerId) {
      throw new BadRequestException("You can't follow yourself");
    }

    const userRepo = this.dataSource.getRepository(User);
    const followRepo = this.dataSource.getRepository(Follow);

    const [user, follower] = await Promise.all([
      userRepo.findOne({ where: { id: userId } }),
      userRepo.findOne({ where: { id: followerId } }),
    ]);

    if (!user) throw new NotFoundException('User not found');
    if (!follower) throw new NotFoundException('Follower not found');

    const existingFollow = await followRepo.findOne({
      where: [
        { user: { id: userId }, follower: { id: followerId } },
      ],
    });

    if (existingFollow) {
      throw new ConflictException('You are already following this user');
    }

    const follow = followRepo.create({ user, follower });
    await followRepo.save(follow);

    return {
      message: `${follower.firstName} started following ${user.firstName}`,
    };
  }
}