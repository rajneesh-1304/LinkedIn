import { Module } from '@nestjs/common';
import { RemoveConnectionController } from './removeConnection.controller';
import { RemoveConnectionService } from './removeConnection.service';

@Module({
  imports: [],
  controllers: [RemoveConnectionController],
  providers: [RemoveConnectionService],
})
export class RemoveConnectionModule {}
