import { Module } from '@nestjs/common';
import { AddConnectionModule } from './addConnection/addConnection.module';
import { RemoveConnectionModule } from './removeConnection/removeConnection.module';
import { UpdateConnectionModule } from './updateConnection/updateConnection.module';
import { CheckConnectionModule } from './checkConnection/checkConnection.module';
import { TotalConnectionModule } from './getTotal/getTotal.module';

@Module({
  imports: [AddConnectionModule, RemoveConnectionModule, UpdateConnectionModule, CheckConnectionModule, TotalConnectionModule],
  controllers: [],
  providers: [],
})
export class ConnectionModule {}
