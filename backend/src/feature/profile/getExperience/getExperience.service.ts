import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Experience } from 'src/domain/entity/experience.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetExperienceService {
  constructor(private readonly dataSource: DataSource) { }

  async getExperience(id: string) {
    if (!id) {
      throw new NotFoundException('Id not provided');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const experienceRepo = this.dataSource.getRepository(Experience);
    const exp = await experienceRepo.find({ where: { user: { id } } });
    return {
      exp
    }
  }

}
