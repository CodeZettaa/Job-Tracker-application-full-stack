import { Injectable, signal, computed } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { ApiConfigService } from "../../core/services/api-config.service";
import {
  LoginDto,
  RegisterDto,
  AuthResponse,
  User,
} from "../models/auth.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly TOKEN_KEY = "job-tracker-token";
  private readonly USER_KEY = "job-tracker-user";

  // State signals
  user = signal<User | null>(this.getStoredUser());
  token = signal<string | null>(this.getStoredToken());
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  // Computed signals
  isAuthenticated = computed(() => {
    return this.user() !== null && this.token() !== null;
  });

  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService,
    private router: Router
  ) {
    // Initialize from storage
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    const storedToken = this.getStoredToken();
    const storedUser = this.getStoredUser();

    if (storedToken && storedUser) {
      this.token.set(storedToken);
      this.user.set(storedUser);
    }
  }

  private getStoredToken(): string | null {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  private getStoredUser(): User | null {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  }

  private saveAuthData(user: User, token: string): void {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
    this.user.set(user);
    this.token.set(token);
  }

  private clearAuthData(): void {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
    this.user.set(null);
    this.token.set(null);
  }

  register(registerDto: RegisterDto): Observable<AuthResponse> {
    this.loading.set(true);
    this.error.set(null);

    return this.http
      .post<AuthResponse>(
        `${this.apiConfig.getBaseUrl()}/auth/register`,
        registerDto
      )
      .pipe(
        tap({
          next: (response) => {
            this.saveAuthData(response.user, response.accessToken);
            this.loading.set(false);
            this.router.navigate(["/jobs"]);
          },
          error: (err) => {
            this.error.set(
              err.error?.message || "Registration failed. Please try again."
            );
            this.loading.set(false);
          },
        })
      );
  }

  login(loginDto: LoginDto): Observable<AuthResponse> {
    this.loading.set(true);
    this.error.set(null);

    return this.http
      .post<AuthResponse>(
        `${this.apiConfig.getBaseUrl()}/auth/login`,
        loginDto
      )
      .pipe(
        tap({
          next: (response) => {
            this.saveAuthData(response.user, response.accessToken);
            this.loading.set(false);
            this.router.navigate(["/jobs"]);
          },
          error: (err) => {
            this.error.set(
              err.error?.message || "Invalid email or password."
            );
            this.loading.set(false);
          },
        })
      );
  }

  logout(): void {
    this.clearAuthData();
    this.router.navigate(["/auth/login"]);
  }

  getToken(): string | null {
    return this.token();
  }

  getCurrentUser(): User | null {
    return this.user();
  }
}

