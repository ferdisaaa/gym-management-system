
import { IsIn } from 'class-validator';

export class UpdateSessionParticipantDto {
  @IsIn(['registered', 'attended', 'cancelled'])
  attendanceStatus: string;
}
