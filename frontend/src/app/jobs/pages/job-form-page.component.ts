import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { JobsStore } from "../state/jobs.store";
import { JobsService } from "../services/jobs.service";
@Component({
  selector: "app-job-form-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./job-form-page.component.html",
  styleUrl: "./job-form-page.component.css",
})
export class JobFormPageComponent implements OnInit {
  jobForm: FormGroup;
  isEditMode = false;
  jobId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public store: JobsStore,
    private jobsService: JobsService
  ) {
    this.jobForm = this.fb.group({
      positionTitle: ["", Validators.required],
      companyName: ["", Validators.required],
      location: [""],
      status: ["applied", Validators.required],
      source: [""],
      applicationDate: ["", Validators.required],
      salaryExpectation: [null],
      salaryOffered: [null],
      jobUrl: ["", [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      notes: [""],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.isEditMode = true;
      this.jobId = id;
      this.loadJob(id);
    } else {
      // Set default date to today
      const today = new Date().toISOString().split("T")[0];
      this.jobForm.patchValue({ applicationDate: today });
    }
  }

  async loadJob(id: string): Promise<void> {
    try {
      const job = await this.jobsService.getById(id).toPromise();
      if (job) {
        // Format date for input
        const date = new Date(job.applicationDate).toISOString().split("T")[0];
        this.jobForm.patchValue({
          ...job,
          applicationDate: date,
        });
      }
    } catch (err) {
      console.error("Error loading job:", err);
      this.router.navigate(["/jobs"]);
    }
  }

  async onSubmit(): Promise<void> {
    // Mark all fields as touched to show validation errors
    if (this.jobForm.invalid) {
      Object.keys(this.jobForm.controls).forEach((key) => {
        this.jobForm.get(key)?.markAsTouched();
      });
      return;
    }

    const formValue = this.jobForm.value;

    // Format date as ISO string
    if (formValue.applicationDate) {
      formValue.applicationDate = new Date(
        formValue.applicationDate
      ).toISOString();
    }

    // Ensure jobUrl is provided (required by backend)
    if (!formValue.jobUrl || formValue.jobUrl.trim() === '') {
      this.jobForm.get('jobUrl')?.setErrors({ required: true });
      this.jobForm.get('jobUrl')?.markAsTouched();
      return;
    }

    if (this.isEditMode && this.jobId) {
      const result = await this.store.updateJob(this.jobId, formValue);
      if (result) {
        this.router.navigate(["/jobs", this.jobId]);
      } else {
        // Error is already set in store, but we can show it here too
        if (this.store.error()) {
          alert(this.store.error());
        }
      }
    } else {
      const result = await this.store.createJob(formValue);
      if (result) {
        this.router.navigate(["/jobs"]);
      } else {
        // Error is already set in store, but we can show it here too
        if (this.store.error()) {
          alert(this.store.error());
        }
      }
    }
  }
}
