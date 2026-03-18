import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dataSourceOptions } from "./data-source";
import { UserModule } from "./feature/user.module";
import AppController from "./app.controller";
import { OutboxModule } from "./feature/services/outbox.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions, 
    }),

    UserModule, 
    OutboxModule  
  ],
  controllers: [AppController],
})
export class AppModule {}
