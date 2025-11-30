import { IsOptional, IsString, IsEnum } from 'class-validator';
import { JobStatus } from '../entities/job.entity';

export class FilterJobsDto {
  @IsEnum(['applied', 'interviewing', 'offer', 'rejected', 'archived'])
  @IsOptional()
  status?: JobStatus;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  search?: string;
}

