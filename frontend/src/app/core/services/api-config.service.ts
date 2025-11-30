import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private readonly baseUrl = environment.apiUrl;

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getJobsUrl(): string {
    return `${this.baseUrl}/jobs`;
  }

  getJobUrl(id: string): string {
    return `${this.baseUrl}/jobs/${id}`;
  }

  getStatsUrl(): string {
    return `${this.baseUrl}/jobs/stats`;
  }
}

