import { IsEnum } from 'class-validator';
import { MembershipStatus } from '../entities/memberships.entity';

export class UpdateMembershipDto {
  @IsEnum(MembershipStatus)
  status: MembershipStatus;
}