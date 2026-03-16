import { Controller, Post, Body, Res, Patch, Param, Get, Query, UseInterceptors, UploadedFiles, UploadedFile, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto } from 'src/domain/DTO/login';
import { LoginService } from './login.service';

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.loginService.login(loginDto);

    res.cookie('token', loginDto.tokenId, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 8,
    });

    return {
      message: 'User logged in successfully',
      user,
    };
  }
}
