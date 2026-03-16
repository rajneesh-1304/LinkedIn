import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterService } from './register.service';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) { }

  @Post('register')
  async registerUser(@Body() userData: any,
    @Res({ passthrough: true }) res: Response,) {
    const user = await this.registerService.register(userData);

    res.cookie('token', userData.tokenId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    });

    return {
      message: 'User created successfully',
      user,
    };
  }
}
