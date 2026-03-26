import { Controller, Post, Body, Res, } from '@nestjs/common';
import { LoginUserDto } from 'src/domain/DTO/login';
import { SignInWithGoogleService } from './signin.service';
const jwt = require('jsonwebtoken');
import axios from 'axios';
import { Response } from 'express';

@Controller('auth')
export class SingInWithGoogleController {
  constructor(private readonly signInWithGoogleService: SignInWithGoogleService) { }

  @Post('signin')
  async singInUser(
    @Body() loginDto: LoginUserDto,
    @Res({ passthrough: true }) res:Response,
  ) {
    const user = await this.signInWithGoogleService.signInWithGoogle(loginDto);

    const data = {
        id: user.id,
        token: loginDto.tokenId,
        firstName: loginDto.firstName
    }
    try {
        await axios.post('http://backend:3001/profile/add', data);
    } catch (error) {
        console.log(error);
    }

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
    console.log(token,'i am token');
    return {
      message: 'User Signed in successfully',
      user
    };
  }
}
