
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsDateString,
    Matches,
    IsInt,
    Min,
    MaxLength,
} from 'class-validator';

export class CreateTrainingSessionDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(150)
    title: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsDateString()
    sessionDate: string;

    @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
    startTime: string;

    @Matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
    endTime: string;

    @IsInt()
    @Min(1)
    capacity: number;

    @IsInt()
    @Min(1)
    trainerId: number;
}
