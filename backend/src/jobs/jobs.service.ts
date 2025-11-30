import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  JobApplication,
  JobApplicationDocument,
  JobStatus,
} from './schemas/job-application.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(JobApplication.name)
    private jobModel: Model<JobApplicationDocument>,
  ) {}

  async findAll(userId: string, filters?: FilterJobsDto): Promise<JobApplication[]> {
    const query: any = { userId: new Types.ObjectId(userId) };

    if (filters?.status) {
      query.status = filters.status;
    }

    if (filters?.company) {
      query.companyName = { $regex: filters.company, $options: 'i' };
    }

    if (filters?.search) {
      query.$or = [
        { positionTitle: { $regex: filters.search, $options: 'i' } },
        { companyName: { $regex: filters.search, $options: 'i' } },
      ];
    }

    const jobs = await this.jobModel
      .find(query)
      .sort({ applicationDate: -1 })
      .exec();

    return jobs.map((job) => this.mapToJobApplication(job));
  }

  async findOne(id: string, userId: string): Promise<JobApplication> {
    const job = await this.jobModel.findOne({
      _id: id,
      userId: new Types.ObjectId(userId),
    });

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return this.mapToJobApplication(job);
  }

  async create(
    createJobDto: CreateJobDto,
    userId: string,
  ): Promise<JobApplication> {
    const job = new this.jobModel({
      userId: new Types.ObjectId(userId),
      positionTitle: createJobDto.positionTitle,
      companyName: createJobDto.companyName,
      location: createJobDto.location,
      status: createJobDto.status,
      source: createJobDto.source,
      applicationDate: new Date(createJobDto.applicationDate),
      lastUpdateDate: new Date(),
      salaryExpectation: createJobDto.salaryExpectation,
      salaryOffered: createJobDto.salaryOffered,
      jobUrl: createJobDto.jobUrl,
      notes: createJobDto.notes,
    });

    await job.save();
    return this.mapToJobApplication(job);
  }

  async update(
    id: string,
    updateJobDto: UpdateJobDto,
    userId: string,
  ): Promise<JobApplication> {
    const updateData: any = {
      lastUpdateDate: new Date(),
    };

    if (updateJobDto.positionTitle !== undefined) {
      updateData.positionTitle = updateJobDto.positionTitle;
    }
    if (updateJobDto.companyName !== undefined) {
      updateData.companyName = updateJobDto.companyName;
    }
    if (updateJobDto.location !== undefined) {
      updateData.location = updateJobDto.location;
    }
    if (updateJobDto.status !== undefined) {
      updateData.status = updateJobDto.status;
    }
    if (updateJobDto.source !== undefined) {
      updateData.source = updateJobDto.source;
    }
    if (updateJobDto.applicationDate) {
      updateData.applicationDate = new Date(updateJobDto.applicationDate);
    }
    if (updateJobDto.salaryExpectation !== undefined) {
      updateData.salaryExpectation = updateJobDto.salaryExpectation;
    }
    if (updateJobDto.salaryOffered !== undefined) {
      updateData.salaryOffered = updateJobDto.salaryOffered;
    }
    if (updateJobDto.jobUrl !== undefined) {
      updateData.jobUrl = updateJobDto.jobUrl;
    }
    if (updateJobDto.notes !== undefined) {
      updateData.notes = updateJobDto.notes;
    }

    const job = await this.jobModel.findOneAndUpdate(
      { _id: id, userId: new Types.ObjectId(userId) },
      updateData,
      { new: true },
    );

    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    return this.mapToJobApplication(job);
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.jobModel.deleteOne({
      _id: id,
      userId: new Types.ObjectId(userId),
    });

    if (result.deletedCount === 0) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
  }

  async getStats(userId: string): Promise<Record<JobStatus, number>> {
    const stats: Record<JobStatus, number> = {
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0,
      archived: 0,
    };

    const jobs = await this.jobModel
      .find({ userId: new Types.ObjectId(userId) })
      .select('status')
      .exec();

    jobs.forEach((job) => {
      stats[job.status]++;
    });

    return stats;
  }

  private mapToJobApplication(job: JobApplicationDocument): JobApplication {
    return {
      id: job._id.toString(),
      userId: job.userId.toString(),
      positionTitle: job.positionTitle,
      companyName: job.companyName,
      location: job.location,
      status: job.status,
      source: job.source,
      applicationDate: job.applicationDate,
      lastUpdateDate: job.lastUpdateDate,
      salaryExpectation: job.salaryExpectation,
      salaryOffered: job.salaryOffered,
      jobUrl: job.jobUrl,
      notes: job.notes,
    } as JobApplication;
  }
}

