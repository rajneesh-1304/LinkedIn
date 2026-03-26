import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterService } from './register.service';
import { PublisherService } from 'src/infra/rabbitMq/publisher';
const jwt = require('jsonwebtoken');
import axios from 'axios';

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService, private readonly publishService: PublisherService
  ) { }

  @Post('register')
  async registerUser(@Body() userData: any,
    @Res({ passthrough: true }) res: Response,) {
      console.log(userData)
    const user = await this.registerService.register(userData);

    const data = {
      id: user.id,
      token: userData.token,
      firstName: userData.firstName,
      lastName: userData.lastName,
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

    return {
      message: 'User created successfully',
      user,
    };
  }
}
