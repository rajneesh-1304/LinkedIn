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
  constructor(private readonly dataSource: DataSource) { }

  async removeFollowing(followerId: string, userId: string) {
    if (!userId || !followerId) {
      throw new BadRequestException('User IDs are required');
    }

    if (userId === followerId) {
      throw new BadRequestException("You can't follow yourself");
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userRepo = this.dataSource.getRepository(User);
      const followRepo = this.dataSource.getRepository(Follow);

      const [user, follower] = await Promise.all([
        userRepo.findOne({ where: { id: userId } }),
        userRepo.findOne({ where: { id: followerId } }),
      ]);

      if (!user) throw new NotFoundException('User not found');
      if (!follower) throw new NotFoundException('Follower not found');

      const followRecord = await followRepo.findOne({
        where: { user: { id: userId }, follower: { id: followerId } },
      });

      if (!followRecord) {
        throw new ConflictException('Not present in follower list');
      }

      const res = await followRepo.delete(followRecord);
      console.log(res, '---------------')
      await queryRunner.commitTransaction();

      return {
        message: `${follower.firstName} unfollowed ${user.firstName}`,
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}