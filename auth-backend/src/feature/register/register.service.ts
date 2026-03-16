import {
    ConflictException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class RegisterService {
    constructor(private readonly dataSource: DataSource) { }

    async register(data: any) {
        try {
            const decodedToken = await adminAuth.verifyIdToken(data.tokenId);
            const email = decodedToken.email;
            if (!email) throw new UnauthorizedException('Invalid token, no email found');

            const userRepo = this.dataSource.getRepository(User);

            const existingUser = await userRepo.findOne({
                where: { email: data.email },
            });

            if (existingUser) {
                throw new ConflictException('Email already registered');
            }

            const user = userRepo.create({
                email: data.email,
                firstName: data.firstName,
            });

            await userRepo.save(user);

            

            return {
                id: user.id,
                firstName: user.firstName,
                email: user.email,
            };
        } catch (error) {
            throw new UnauthorizedException(error);
        }
    }

}
