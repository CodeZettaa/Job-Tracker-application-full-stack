import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { RegisterDto } from "../models/auth.model";

function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");

  if (!password || !confirmPassword) {
    return null;
  }

  return password.value === confirmPassword.value
    ? null
    : { passwordMismatch: true };
}

@Component({
  selector: "app-register-page",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: "./register-page.component.html",
  styleUrl: "./register-page.component.css",
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        firstName: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        lastName: [
          "",
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
          ],
        ],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/
            ),
          ],
        ],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    // If already authenticated, redirect to jobs
    if (this.authService.isAuthenticated()) {
      this.router.navigate(["/jobs"]);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { confirmPassword, ...registerDto } = this.registerForm.value;
      this.authService.register(registerDto as RegisterDto).subscribe({
        error: () => {
          // Error handling is done in the service
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}

