import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsEnum,
  IsDateString,
  IsNumber,
  IsUrl,
} from 'class-validator';
import { JobStatus, JobSource } from '../entities/job.entity';

export class CreateJobDto {
  @IsString()
  @IsNotEmpty()
  positionTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsEnum(['applied', 'interviewing', 'offer', 'rejected', 'archived'])
  @IsNotEmpty()
  status: JobStatus;

  @IsEnum(['linkedin', 'company_website', 'referral', 'other'])
  @IsOptional()
  source?: JobSource;

  @IsDateString()
  @IsNotEmpty()
  applicationDate: string;

  @IsNumber()
  @IsOptional()
  salaryExpectation?: number;

  @IsNumber()
  @IsOptional()
  salaryOffered?: number;

  @IsUrl({}, { message: 'Job URL must be a valid URL' })
  @IsNotEmpty({ message: 'Job URL is required' })
  jobUrl: string;

  @IsString()
  @IsOptional()
  notes?: string;
}

