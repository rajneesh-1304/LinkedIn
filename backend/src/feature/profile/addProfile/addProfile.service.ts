import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Profile } from 'src/domain/DTO/profile';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class AddProfileService {
    constructor(private readonly dataSource: DataSource) { }


    async addProfile(userData: Profile, file: Express.Multer.File, file2: Express.Multer.File) {
        const decodedToken = await adminAuth.verifyIdToken(userData.token);
        const email = decodedToken.email;
        if (!email) throw new UnauthorizedException('Invalid token, no email found');

        const userRepo = this.dataSource.getRepository(User);
        const imageUrls = `http://localhost:3001/uploads/${file?.filename}`;
        const backgroundImage = `http://localhost:3001/uploads/${file2?.filename}`;
        const isExist = await userRepo.findOne({where: {id: userData.id}});
        if(isExist){
            return {message:"User Signed in successfully"};
        }

        const user = userRepo.create(
            {
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName ?? null,
                headline: userData.headline ?? null,
                location: userData.location ?? null,
                profilePicture: file ? imageUrls : null,
                bio: userData.bio ?? null,
                backgroundImage: file2 ? backgroundImage : null,
            }
        );
        await userRepo.save(user);
        return {
            message: 'User created successfully',
            user:{
                id: userData.id,
                firstName: userData.firstName,
                lastName: userData.lastName,
            }
        };
    }

}
