import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Education } from 'src/domain/entity/education.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GetEducationService {
  constructor(private readonly dataSource: DataSource) { }

  async getEducation(id: string) {
    if (!id) {
      throw new NotFoundException('Id not provided');
    }
    const userRepo = this.dataSource.getRepository(User);
    const user = await userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    const educRepo = this.dataSource.getRepository(Education);
    const edu = await educRepo.find({ where: { user: { id } } });
    return {
      edu
    }
  }

}
