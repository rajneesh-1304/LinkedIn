import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { MessageModule } from './feature/connection/module';

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
    MessageModule
  ],
  controllers: [AppController],
  providers: []
})
export class AppModule {}
