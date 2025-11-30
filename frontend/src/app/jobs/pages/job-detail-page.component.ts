import { Component, OnInit, signal } from "@angular/core";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { JobsService } from "../services/jobs.service";
import {
  JobApplication,
  JobStatus,
  JobSource,
} from "../models/job-application.model";

@Component({
  selector: "app-job-detail-page",
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: "./job-detail-page.component.html",
  styleUrl: "./job-detail-page.component.css",
})
export class JobDetailPageComponent implements OnInit {
  job = signal<JobApplication | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  jobId = signal<string | null>(null);

  constructor(
    private jobsService: JobsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.jobId.set(id);
      this.loadJob(id);
    } else {
      this.router.navigate(["/jobs"]);
    }
  }

  async loadJob(id: string): Promise<void> {
    this.loading.set(true);
    this.error.set(null);

    try {
      const job = await this.jobsService.getById(id).toPromise();
      if (job) {
        this.job.set(job);
      } else {
        this.error.set("Job not found");
      }
    } catch (err) {
      this.error.set("Failed to load job");
      console.error("Error loading job:", err);
    } finally {
      this.loading.set(false);
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  formatStatus(status: JobStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  formatSource(source: JobSource): string {
    return source
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  formatSalary(amount: number): string {
    return new Intl.NumberFormat("en-US").format(amount);
  }

  async deleteJob(): Promise<void> {
    const id = this.jobId();
    if (!id) return;

    if (confirm("Are you sure you want to delete this job application?")) {
      try {
        await this.jobsService.delete(id).toPromise();
        this.router.navigate(["/jobs"]);
      } catch (err) {
        console.error("Error deleting job:", err);
        alert("Failed to delete job");
      }
    }
  }
}
