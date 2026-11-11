import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membership } from './entities/memberships.entity';
import { MembershipsService } from './memberships.service';
import { MembershipsController } from './memberships.controller';
import { MembersModule } from '../members/members.module';
import { MembershipPlansModule } from '../membership_plans/membership_plans.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Membership]),
    MembersModule,
    MembershipPlansModule,
  ],
  controllers: [MembershipsController],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipsModule {}