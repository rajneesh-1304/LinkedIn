import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Profile } from 'src/domain/DTO/profile';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UpdateProfileService {
  constructor(private readonly dataSource: DataSource) { }


  async updateProfile(id: string, userData: Profile, file: Express.Multer.File) {
      const userRepo = this.dataSource.getRepository(User);
      const imageUrls = `http://localhost:3001/uploads/${file?.filename}`;
      await userRepo.update(
        { id },
        {
          firstName: userData.firstName,
          lastName: userData.lastName ?? null,
          headline: userData.headline ?? null,
          location: userData.location ?? null,
          profilePicture: imageUrls ?? null,
          bio: userData.bio ?? null,
        }
      );
      return {
        message: 'User updated successfully',
      };
    }
  
}
