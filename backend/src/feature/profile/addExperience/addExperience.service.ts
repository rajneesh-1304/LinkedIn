import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExperienceDto } from 'src/domain/DTO/experience';
import { Experience } from 'src/domain/entity/experience.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AddExperienceService {
  constructor(private readonly dataSource: DataSource) { }


  async addExperience(id: string, userData: ExperienceDto) {
      const userRepo = this.dataSource.getRepository(User);
      const expRepo = this.dataSource.getRepository(Experience);
      if (new Date(userData.startDate) > new Date(userData.endDate)) {
        throw new ConflictException('Start date cannot be after end date');
      }
      const user = await userRepo.findOne({ where: { id } });
  
      if (!user) throw new NotFoundException('User not found');
  
      const edu = expRepo.create({
        company: userData.company,
        position: userData.position,
        location: userData.location,
        startDate: userData.startDate,
        endDate: userData.endDate,
        user
      })
      await expRepo.save(edu);
      return {
        message: 'Experience details added successfully'
      }
    }
  
}
