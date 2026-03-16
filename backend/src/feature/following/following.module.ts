import { Module } from '@nestjs/common';
import { AddFollowModule } from './addFollowing/addFollowing.module';
import { RemoveFollowModule } from './removeFollowing/removeFollowing.module';
import { CheckFollowModule } from './checkFollowing/checkFollowing.module';
import { TotalFollowModule } from './getTotal/getTotal.module';

@Module({
  imports: [AddFollowModule, RemoveFollowModule, CheckFollowModule, TotalFollowModule],
  controllers: [],
  providers: [],
})
export class FollowModule {}
