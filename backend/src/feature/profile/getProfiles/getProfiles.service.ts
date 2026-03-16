import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class GetProfilesService {
  constructor(private readonly dataSource: DataSource) { }


  async getAll({
    page, limit
  }) {
    const userRepo = this.dataSource.getRepository(User);

    const [user, total] = await userRepo.createQueryBuilder('user').skip((page - 1) * limit).take(limit).getManyAndCount();
    return {
      user: user,
      total,
      page, limit, hasMore: page * limit < total
    };
  }
  
}
