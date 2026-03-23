import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from 'src/domain/entity/user.entity';
import { Skills } from 'src/domain/entity/skills.entity';

@Injectable()
export class AddSkillsService {
  constructor(private readonly dataSource: DataSource) {}

  async addSkills(userId: string, skillNames: string[]) {
    const userRepo = this.dataSource.getRepository(User);
    const skillsRepo = this.dataSource.getRepository(Skills);

    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ['skills'],
    });
    if (!user) throw new NotFoundException('User not found');

    const skillsToAdd: Skills[] = [];

    for (const skillName of skillNames) {
      const normalizedSkill = skillName.trim();

      let skill = await skillsRepo.findOne({ where: { skill: normalizedSkill } });

      if (!skill) {
        skill = skillsRepo.create({ skill: normalizedSkill });
        await skillsRepo.save(skill);
      }

      if (!user.skills.some((s) => s.id === skill.id)) {
        skillsToAdd.push(skill);
      }
    }

    user.skills = [...user.skills, ...skillsToAdd];

    await userRepo.save(user);

    return {
      message: 'Skills added successfully',
      addedSkills: skillsToAdd.map((s) => s.skill),
    };
  }
}