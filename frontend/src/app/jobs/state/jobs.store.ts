import { Injectable, signal, computed } from '@angular/core';
import { JobsService } from '../services/jobs.service';
import {
  JobApplication,
  CreateJobDto,
  UpdateJobDto,
  FilterJobsDto,
  JobStats,
} from '../models/job-application.model';

@Injectable({
  providedIn: 'root',
})
export class JobsStore {

  // State signals
  jobs = signal<JobApplication[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  filters = signal<FilterJobsDto>({});
  stats = signal<JobStats>({
    applied: 0,
    interviewing: 0,
    offer: 0,
    rejected: 0,
    archived: 0,
  });

  // Computed signals
  filteredJobs = computed(() => {
    const allJobs = this.jobs();
    const currentFilters = this.filters();

    let filtered = [...allJobs];

    if (currentFilters.status) {
      filtered = filtered.filter((job) => job.status === currentFilters.status);
    }

    if (currentFilters.company) {
      filtered = filtered.filter((job) =>
        job.companyName
          .toLowerCase()
          .includes(currentFilters.company!.toLowerCase()),
      );
    }

    if (currentFilters.search) {
      const searchLower = currentFilters.search.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.positionTitle.toLowerCase().includes(searchLower) ||
          job.companyName.toLowerCase().includes(searchLower),
      );
    }

    // Sort by application date (newest first)
    return filtered.sort(
      (a, b) =>
        new Date(b.applicationDate).getTime() -
        new Date(a.applicationDate).getTime(),
    );
  });

  constructor(private jobsService: JobsService) {}

  async loadJobs(filters?: FilterJobsDto): Promise<void> {
    this.loading.set(true);
    this.error.set(null);
    if (filters) {
      this.filters.set(filters);
    }

    try {
      const jobs = await this.jobsService.getAll(this.filters()).toPromise();
      if (jobs) {
        this.jobs.set(jobs);
      }
    } catch (err) {
      this.error.set('Failed to load jobs');
      console.error('Error loading jobs:', err);
    } finally {
      this.loading.set(false);
    }
  }

  async loadStats(): Promise<void> {
    try {
      const stats = await this.jobsService.getStats().toPromise();
      if (stats) {
        this.stats.set(stats);
      }
    } catch (err) {
      console.error('Error loading stats:', err);
    }
  }

  async createJob(dto: CreateJobDto): Promise<JobApplication | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const job = await this.jobsService.create(dto).toPromise();
      if (job) {
        this.jobs.update((jobs) => [job, ...jobs]);
        await this.loadStats();
        return job;
      }
      return null;
    } catch (err: any) {
      // Extract error message from backend response
      let errorMessage = 'Failed to create job';
      if (err?.error?.message) {
        if (Array.isArray(err.error.message)) {
          errorMessage = err.error.message.join(', ');
        } else {
          errorMessage = err.error.message;
        }
      } else if (err?.message) {
        errorMessage = err.message;
      }
      this.error.set(errorMessage);
      console.error('Error creating job:', err);
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async updateJob(
    id: string,
    dto: UpdateJobDto,
  ): Promise<JobApplication | null> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const job = await this.jobsService.update(id, dto).toPromise();
      if (job) {
        this.jobs.update((jobs) =>
          jobs.map((j) => (j.id === id ? job : j)),
        );
        await this.loadStats();
        return job;
      }
      return null;
    } catch (err: any) {
      // Extract error message from backend response
      let errorMessage = 'Failed to update job';
      if (err?.error?.message) {
        if (Array.isArray(err.error.message)) {
          errorMessage = err.error.message.join(', ');
        } else {
          errorMessage = err.error.message;
        }
      } else if (err?.message) {
        errorMessage = err.message;
      }
      this.error.set(errorMessage);
      console.error('Error updating job:', err);
      return null;
    } finally {
      this.loading.set(false);
    }
  }

  async deleteJob(id: string): Promise<boolean> {
    this.loading.set(true);
    this.error.set(null);

    try {
      await this.jobsService.delete(id).toPromise();
      this.jobs.update((jobs) => jobs.filter((j) => j.id !== id));
      await this.loadStats();
      return true;
    } catch (err) {
      this.error.set('Failed to delete job');
      console.error('Error deleting job:', err);
      return false;
    } finally {
      this.loading.set(false);
    }
  }

  setFilters(filters: FilterJobsDto): void {
    this.filters.set(filters);
  }
}

