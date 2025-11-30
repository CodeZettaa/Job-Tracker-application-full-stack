import { Component, computed, input } from "@angular/core";
import { JobStats } from "../../models/job-application.model";

@Component({
  selector: "app-job-stats",
  standalone: true,
  imports: [],
  templateUrl: "./job-stats.component.html",
  styleUrl: "./job-stats.component.css",
})
export class JobStatsComponent {
  stats = input.required<JobStats>();

  total = computed(() => {
    const s = this.stats();
    return s.applied + s.interviewing + s.offer + s.rejected + s.archived;
  });
}
