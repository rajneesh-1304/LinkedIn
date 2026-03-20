import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { RegisterService } from './register.service';
import { PublisherService } from 'src/infra/rabbitMq/publisher';
const jwt = require('jsonwebtoken');

@Controller('auth')
export class RegisterController {
  constructor(private readonly registerService: RegisterService, private readonly publishService: PublisherService
  ) { }

  @Post('register')
  async registerUser(@Body() userData: any,
    @Res({ passthrough: true }) res: Response,) {
    const user = await this.registerService.register(userData);

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
