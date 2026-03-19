import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { PublisherService } from 'src/infra/rabbitMq/publisher';
import { LogoutController } from './logout/logout.controller';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController, RegisterController, LogoutController],
  providers: [LoginService, RegisterService, RabbitConnection, PublisherService],
})
export class UserModule {}
