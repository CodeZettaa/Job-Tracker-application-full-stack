import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JobApplication, JobStatus } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { FilterJobsDto } from './dto/filter-jobs.dto';

@Injectable()
export class JobsService {
  private jobs: JobApplication[] = [];

  findAll(filters?: FilterJobsDto): JobApplication[] {
    let filteredJobs = [...this.jobs];

    if (filters?.status) {
      filteredJobs = filteredJobs.filter(
        (job) => job.status === filters.status,
      );
    }

    if (filters?.company) {
      filteredJobs = filteredJobs.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(filters.company!.toLowerCase()),
      );
    }

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.positionTitle.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower),
      );
    }

    // Sort by application date (newest first)
    return filteredJobs.sort(
      (a, b) =>
        new Date(b.applicationDate).getTime() -
        new Date(a.applicationDate).getTime(),
    );
  }

  findOne(id: string): JobApplication {
    const job = this.jobs.find((j) => j.id === id);
    if (!job) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    return job;
  }

  create(createJobDto: CreateJobDto): JobApplication {
    const job: JobApplication = {
      id: uuidv4(),
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
    };

    this.jobs.push(job);
    return job;
  }

  update(id: string, updateJobDto: UpdateJobDto): JobApplication {
    const jobIndex = this.jobs.findIndex((j) => j.id === id);
    if (jobIndex === -1) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }

    const existingJob = this.jobs[jobIndex];
    
    // Build updated job, handling date conversion
    const updatedJob: JobApplication = {
      ...existingJob,
      positionTitle: updateJobDto.positionTitle ?? existingJob.positionTitle,
      companyName: updateJobDto.companyName ?? existingJob.companyName,
      location: updateJobDto.location ?? existingJob.location,
      status: updateJobDto.status ?? existingJob.status,
      source: updateJobDto.source ?? existingJob.source,
      applicationDate: updateJobDto.applicationDate
        ? new Date(updateJobDto.applicationDate)
        : existingJob.applicationDate,
      lastUpdateDate: new Date(),
      salaryExpectation: updateJobDto.salaryExpectation ?? existingJob.salaryExpectation,
      salaryOffered: updateJobDto.salaryOffered ?? existingJob.salaryOffered,
      jobUrl: updateJobDto.jobUrl ?? existingJob.jobUrl,
      notes: updateJobDto.notes ?? existingJob.notes,
    };

    this.jobs[jobIndex] = updatedJob;
    return updatedJob;
  }

  remove(id: string): void {
    const jobIndex = this.jobs.findIndex((j) => j.id === id);
    if (jobIndex === -1) {
      throw new NotFoundException(`Job with ID ${id} not found`);
    }
    this.jobs.splice(jobIndex, 1);
  }

  getStats(): Record<JobStatus, number> {
    const stats: Record<JobStatus, number> = {
      applied: 0,
      interviewing: 0,
      offer: 0,
      rejected: 0,
      archived: 0,
    };

    this.jobs.forEach((job) => {
      stats[job.status]++;
    });

    return stats;
  }
}

