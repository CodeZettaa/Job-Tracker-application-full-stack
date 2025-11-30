import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobApplicationDocument = JobApplication & Document;

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

@Schema({ timestamps: true })
export class JobApplication {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  positionTitle: string;

  @Prop({ required: true })
  companyName: string;

  @Prop()
  location?: string;

  @Prop({ required: true, enum: ['applied', 'interviewing', 'offer', 'rejected', 'archived'] })
  status: JobStatus;

  @Prop({ enum: ['linkedin', 'company_website', 'referral', 'other'] })
  source?: JobSource;

  @Prop({ required: true })
  applicationDate: Date;

  @Prop()
  lastUpdateDate?: Date;

  @Prop()
  salaryExpectation?: number;

  @Prop()
  salaryOffered?: number;

  @Prop()
  jobUrl?: string;

  @Prop()
  notes?: string;
}

export const JobApplicationSchema = SchemaFactory.createForClass(JobApplication);

// Create indexes for better query performance
JobApplicationSchema.index({ userId: 1, status: 1 });
JobApplicationSchema.index({ userId: 1, companyName: 1 });

