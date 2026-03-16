import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/domain/post.entity';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService, RabbitConnection],
})
export class PostModule {}
