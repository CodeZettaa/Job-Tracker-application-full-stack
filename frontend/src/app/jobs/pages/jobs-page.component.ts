import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { JobsStore } from "../state/jobs.store";
import { JobStatsComponent } from "../components/job-stats/job-stats.component";
import { JobStatus, JobSource } from "../models/job-application.model";

@Component({
  selector: "app-jobs-page",
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, JobStatsComponent],
  templateUrl: "./jobs-page.component.html",
  styleUrl: "./jobs-page.component.css",
})
export class JobsPageComponent implements OnInit {
  statusFilter = "";
  searchFilter = "";
  companyFilter = "";

  constructor(public store: JobsStore, private router: Router) {}

  ngOnInit(): void {
    this.store.loadJobs();
    this.store.loadStats();
  }

  applyFilters(): void {
    const filters: any = {};
    if (this.statusFilter) {
      filters.status = this.statusFilter as JobStatus;
    }
    if (this.searchFilter) {
      filters.search = this.searchFilter;
    }
    if (this.companyFilter) {
      filters.company = this.companyFilter;
    }
    this.store.setFilters(filters);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  async deleteJob(id: string): Promise<void> {
    if (confirm("Are you sure you want to delete this job application?")) {
      const success = await this.store.deleteJob(id);
      if (success) {
        // Job deleted, list will update automatically
      }
    }
  }

  formatStatus(status: JobStatus): string {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }

  formatSource(source: JobSource): string {
    if (!source) return "";
    return source
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
}
