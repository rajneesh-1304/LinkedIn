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
export class TotalFollowingService {
  constructor(private readonly dataSource: DataSource) { }

  async getTotalFollowing(id: string) {
      const userRepo = this.dataSource.getRepository(User);
      const followRepo =this.dataSource.getRepository(Follow);
      if(!id){
        throw new BadRequestException('User is missing');
      }
      const total = await followRepo.count({where: {followerId: id}});
      
      return total;
    }
}
