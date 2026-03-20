import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './feature/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions, 
    }),  
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService,]
})
export class AppModule {}
