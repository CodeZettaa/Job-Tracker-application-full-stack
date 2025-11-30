import {
  IsString,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { JobStatus, JobSource } from '../entities/job.entity';

export class UpdateJobDto {
  @IsString()
  @IsOptional()
  positionTitle?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(['applied', 'interviewing', 'offer', 'rejected', 'archived'])
  @IsOptional()
  status?: JobStatus;

  @IsEnum(['linkedin', 'company_website', 'referral', 'other'])
  @IsOptional()
  source?: JobSource;

  @IsDateString()
  @IsOptional()
  applicationDate?: string;

  @IsNumber()
  @IsOptional()
  salaryExpectation?: number;

  @IsNumber()
  @IsOptional()
  salaryOffered?: number;

  @IsUrl()
  @IsOptional()
  jobUrl?: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

