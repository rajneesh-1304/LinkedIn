import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/entity/user.entity';
import { Skills } from 'src/domain/entity/skills.entity';

@Injectable()
export class GetAllSkillsService {
  constructor(private readonly dataSource: DataSource) {}

  async getAllSkills() {
    const skillsRepo = this.dataSource.getRepository(Skills);

    const skills = await skillsRepo.find({select:['skill'],});

    if (!skills) throw new NotFoundException('No skill found');

    return skills.map((item) => item.skill);
  }
}