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

export class JobApplication {
  id: string;
  userId: string;
  positionTitle: string;
  companyName: string;
  location?: string;
  status: JobStatus;
  source?: JobSource;
  applicationDate: Date;
  lastUpdateDate?: Date;
  salaryExpectation?: number;
  salaryOffered?: number;
  jobUrl?: string;
  notes?: string;
}

