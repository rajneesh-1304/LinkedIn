import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class SignInWithGoogleService {
  constructor(private readonly dataSource: DataSource) { }


  async signInWithGoogle(data: { email: string, tokenId: string }) {
    try {
      const decodedToken = await adminAuth.verifyIdToken(data.tokenId);
      const email = decodedToken.email;
      if (!email) throw new UnauthorizedException('Invalid token, no email found');

      const userRepo = this.dataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) {
        const newUser = userRepo.create({
            email: email,
        })
        await userRepo.save(newUser);
        return {
            id: newUser.id,
            email: newUser.email,
        }
      }
    
      return {
        id: user.id,
        email: user.email,
      };
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  
}
