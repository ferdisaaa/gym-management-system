import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrainerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  specialization?: string;
}