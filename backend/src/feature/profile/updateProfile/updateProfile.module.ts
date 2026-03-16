import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { UpdateProfileController } from './updateProfile.controller';
import { UpdateProfileService } from './updateProfile.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UpdateProfileController],
  providers: [UpdateProfileService, RabbitConnection],
})
export class UpdateProfileModule {}
