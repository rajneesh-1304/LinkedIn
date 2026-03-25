import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { MessagingModule } from './features/services/messaging.module';
import { PostModule } from './features/post/post.module';
import { OutboxModule } from './infra/services/outbox.module';

@Controller()
class AppController {
  @Get()
  root() {
    return { message: 'NestJS Backend is running!' };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions, 
    }),

    MessagingModule,
    PostModule,
    OutboxModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
