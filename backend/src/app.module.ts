import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { ProfileModule } from './feature/profile/profile.module';
import { FollowModule } from './feature/following/following.module';
import { ConnectionModule } from './feature/connection/connection.module';
import { PublisherService } from './infra/rabbitMq/publisher';

@Controller()
class AppController {
  @UseGuards(FirebaseAuthGuard)
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

    ProfileModule,
    FollowModule,
    ConnectionModule,    
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
