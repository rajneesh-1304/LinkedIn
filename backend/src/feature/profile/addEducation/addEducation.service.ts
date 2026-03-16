import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EducationDto } from 'src/domain/DTO/education';
import { Education } from 'src/domain/entity/education.entity';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AddEducationService {
  constructor(private readonly dataSource: DataSource) { }

  async addEducation(id: string, userData: EducationDto) {
      const userRepo = this.dataSource.getRepository(User);
      const educRepo = this.dataSource.getRepository(Education);
      if (new Date(userData.startDate) > new Date(userData.endDate)) {
        throw new ConflictException('Start date cannot be after end date');
      }
      const user = await userRepo.findOne({ where: { id } });
  
      if (!user) throw new NotFoundException('User not found');
      const edu = educRepo.create({
        instituteName: userData.instituteName,
        degreeName: userData.degreeName,
        Grade: userData.Grade,
        startDate: userData.startDate,
        endDate: userData.endDate,
        user
      })
      await educRepo.save(edu);
      return {
        message: 'Education details added successfully'
      }
    }
  
}
