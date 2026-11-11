import { IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateMembershipDto {
  @IsInt()
  memberId: number;

  @IsInt()
  planId: number;

  // format YYYY-MM-DD, kalau kosong dipakai hari ini
  @IsOptional()
  @IsDateString()
  startDate?: string;
}