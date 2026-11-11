
import {
  IsString,
  IsOptional,
  IsDateString,
  IsInt,
  Min,
  IsIn,
  Matches,
  MaxLength,
} from 'class-validator';

export class UpdateTrainingSessionDto {
  @IsOptional()
  @IsString()
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  sessionDate?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  startTime?: string;

  @IsOptional()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
  endTime?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  capacity?: number;

  @IsOptional()
  @IsIn(['scheduled', 'completed', 'cancelled'])
  status?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  trainerId?: number;
}
