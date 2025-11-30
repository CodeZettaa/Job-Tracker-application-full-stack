import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../../core/services/api-config.service';
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
export class JobsService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
  ) {}

  getAll(filters?: FilterJobsDto): Observable<JobApplication[]> {
    let params = new HttpParams();
    if (filters?.status) {
      params = params.set('status', filters.status);
    }
    if (filters?.company) {
      params = params.set('company', filters.company);
    }
    if (filters?.search) {
      params = params.set('search', filters.search);
    }

    return this.http.get<JobApplication[]>(this.apiConfig.getJobsUrl(), {
      params,
    });
  }

  getById(id: string): Observable<JobApplication> {
    return this.http.get<JobApplication>(this.apiConfig.getJobUrl(id));
  }

  create(job: CreateJobDto): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiConfig.getJobsUrl(), job);
  }

  update(id: string, job: UpdateJobDto): Observable<JobApplication> {
    return this.http.patch<JobApplication>(
      this.apiConfig.getJobUrl(id),
      job,
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.apiConfig.getJobUrl(id));
  }

  getStats(): Observable<JobStats> {
    return this.http.get<JobStats>(this.apiConfig.getStatsUrl());
  }
}

