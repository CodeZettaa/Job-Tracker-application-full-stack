export type JobStatus =
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'rejected'
  | 'archived';

export type JobSource =
  | 'linkedin'
  | 'company_website'
  | 'referral'
  | 'other';

export interface JobApplication {
  id: string;
  positionTitle: string;
  companyName: string;
  location?: string;
  status: JobStatus;
  source?: JobSource;
  applicationDate: string;
  lastUpdateDate?: string;
  salaryExpectation?: number;
  salaryOffered?: number;
  jobUrl?: string;
  notes?: string;
}

export interface CreateJobDto {
  positionTitle: string;
  companyName: string;
  location?: string;
  status: JobStatus;
  source?: JobSource;
  applicationDate: string;
  salaryExpectation?: number;
  salaryOffered?: number;
  jobUrl?: string;
  notes?: string;
}

export interface UpdateJobDto {
  positionTitle?: string;
  companyName?: string;
  location?: string;
  status?: JobStatus;
  source?: JobSource;
  applicationDate?: string;
  salaryExpectation?: number;
  salaryOffered?: number;
  jobUrl?: string;
  notes?: string;
}

export interface FilterJobsDto {
  status?: JobStatus;
  company?: string;
  search?: string;
}

export interface JobStats {
  applied: number;
  interviewing: number;
  offer: number;
  rejected: number;
  archived: number;
}

