import { Module } from '@nestjs/common';
import { User } from 'src/domain/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddConnectionController } from './addConnection/addConnection.controller';
import { CheckConnectionController } from './checkConnection/checkConnection.controller';
import { RemoveConnectionController } from './removeConnection/removeConnection.controller';
import { UpdateConnectionController } from './updateConnection/updateConnection.controller';
import { TotalConnectionController } from './getTotal/getTotal.controller';
import { AddConnectionService } from './addConnection/addConnection.service';
import { CheckConnectionService } from './checkConnection/checkConnection.service';
import { RemoveConnectionService } from './removeConnection/removeConnection.service';
import { UpdateConnectionService } from './updateConnection/updateConnection.service';
import { TotalConnectionService } from './getTotal/getTotal.service';
import { GetTotalConnectionController } from './getSuggestion/getPendingConnection';
import { GetConnectionService } from './getSuggestion/getPendingService';
import { GetPendingConnectionController } from './getPendingConnection/getPendingConnection';
import { GetPendingConnectionService } from './getPendingConnection/getPendingService';
import { PublisherService } from 'src/infra/rabbitMq/publisher';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ],
  controllers: [
    AddConnectionController,
    CheckConnectionController,
    RemoveConnectionController,
    UpdateConnectionController,
    TotalConnectionController,
    GetTotalConnectionController,
    GetPendingConnectionController
  ],
  providers: [
    AddConnectionService,
    CheckConnectionService,
    RemoveConnectionService,
    UpdateConnectionService,
    TotalConnectionService,
    GetConnectionService,
    GetPendingConnectionService,
    PublisherService,
    RabbitConnection
    ,JwtAuthGuard, JwtService
  ],
})
export class ConnectionModule {}
