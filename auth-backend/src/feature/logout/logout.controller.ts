import { Controller, Post, Body, Res,  } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto } from 'src/domain/DTO/login';

@Controller('auth')
export class LogoutController {

  @Post('logout')
  async logoutUser(
    @Res({ passthrough: true }) res: Response,
  ) {
    res.clearCookie('token', { httpOnly: true, secure: true, path: '/' });

    return {
      message: 'User logged out successfully',
    };
  }
}
