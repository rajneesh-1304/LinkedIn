import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/entity/user.entity';

@Injectable()
export class GetSkillsService {
  constructor(private readonly dataSource: DataSource) {}

  async getSkills(userId: string) {
    const userRepo = this.dataSource.getRepository(User);

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ['skills'], 
    });

    if (!user) throw new NotFoundException('User not found');

    return user.skills;
  }
}