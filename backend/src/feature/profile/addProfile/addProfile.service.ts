import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Profile } from 'src/domain/DTO/profile';
import { User } from 'src/domain/entity/user.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AddProfileService {
    constructor(private readonly dataSource: DataSource) { }


    async addProfile(id: string, userData: Profile, file: Express.Multer.File, file2: Express.Multer.File) {
        const userRepo = this.dataSource.getRepository(User);
        const imageUrls = `http://localhost:3001/uploads/${file?.filename}`;
        const backgroundImage = `http://localhost:3001/uploads/${file2?.filename}`;
        const user = userRepo.create(
            {
                id: id,
                firstName: userData.firstName,
                lastName: userData.lastName ?? null,
                headline: userData.headline ?? null,
                location: userData.location ?? null,
                profilePicture: imageUrls ?? null,
                bio: userData.bio ?? null,
                backgroundImage: backgroundImage ?? null,
            }
        );
        await userRepo.save(user);
        return {
            message: 'User updated successfully',
        };
    }

}
