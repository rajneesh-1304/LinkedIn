import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { GetProfileController } from './getProfile.controller';
import { GetProfileService } from './getProfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GetProfileController],
  providers: [GetProfileService, RabbitConnection],
})
export class GetProfileModule{}
