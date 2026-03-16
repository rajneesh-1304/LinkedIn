import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { adminAuth } from 'src/firebaseAdmin';
import { DataSource } from 'typeorm';

@Injectable()
export class LoginService {
  constructor(private readonly dataSource: DataSource) { }


  async login(data: { email: string, tokenId: string }) {
    try {
      const decodedToken = await adminAuth.verifyIdToken(data.tokenId);
      const email = decodedToken.email;
      if (!email) throw new UnauthorizedException('Invalid token, no email found');

      const userRepo = this.dataSource.getRepository(User);
      const user = await userRepo.findOne({ where: { email } });

      if (!user) throw new NotFoundException('User not found');
      // if (user.isBanned) throw new ForbiddenException('User is banned, please contact admin');

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
