import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { adminAuth } from './firebaseAdmin';
import { refreshIdToken } from './refreshToken';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.cookies?.token;
    const refreshToken = request.cookies?.refreshToken;

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      if (refreshToken) {
        const newTokens = await refreshIdToken(refreshToken);
        token = newTokens.idToken;

        request.res.cookie('token', newTokens.idToken, { httpOnly: true });
        request.res.cookie('refreshToken', newTokens.refreshToken, { httpOnly: true });

        const decodedToken = await adminAuth.verifyIdToken(token);
        request.user = decodedToken;
        return true;
      }

      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}