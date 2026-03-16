import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetProfileService {
  constructor(private readonly dataSource: DataSource) { }


  async getProfile(id: string){
    if(!id){
      throw new NotFoundException('Id not provided');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return {
      user
    }
  }
  
}
