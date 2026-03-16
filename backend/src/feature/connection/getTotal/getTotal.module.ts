import { Module } from '@nestjs/common';
import { TotalConnectionController } from './getTotal.controller';
import { TotalConnectionService } from './getTotal.service';

@Module({
  imports: [],
  controllers: [TotalConnectionController],
  providers: [TotalConnectionService],
})
export class TotalConnectionModule {}
