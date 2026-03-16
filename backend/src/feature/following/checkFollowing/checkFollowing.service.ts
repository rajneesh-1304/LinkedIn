import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Follow } from 'src/domain/entity/follow.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class CheckFollowingService {
  constructor(private readonly dataSource: DataSource) { }

  async checkFollowing(id: string, userId: string) {
      const userRepo = this.dataSource.getRepository(User);
      const followRepo =this.dataSource.getRepository(Follow);
      if(!id || !userId){
        throw new BadRequestException('User is missing');
      }
      const user = await userRepo.findOne({where: {id: userId}});
      if(!user){
        throw new NotFoundException('User not found');
      }
      const follower = await userRepo.findOne({where: {id: id}});
      if(!follower){
        throw new NotFoundException('Follower not found');
      }
      const isPresent = await followRepo.findOne({where: {userId: userId, followerId: id}});
      if(isPresent){
        return true;
      }
      return false;
    }
}
