import { Controller, Post, Body, Res, } from '@nestjs/common';
import { Response } from 'express';
import { LoginUserDto } from 'src/domain/DTO/login';
import { LoginService } from './login.service';
const jwt = require('jsonwebtoken');

@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post('login')
  async loginUser(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.loginService.login(loginDto);

    const token = jwt.sign(
      { userId: user.id }, 
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('token', token, {
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
