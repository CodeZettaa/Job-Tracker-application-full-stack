import { Routes } from "@angular/router";
import { authGuard, noAuthGuard } from "./auth/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/jobs",
    pathMatch: "full",
  },
  {
    path: "auth",
    canActivate: [noAuthGuard],
    children: [
      {
        path: "login",
        loadComponent: () =>
          import("./auth/pages/login-page.component").then(
            (m) => m.LoginPageComponent
          ),
      },
      {
        path: "register",
        loadComponent: () =>
          import("./auth/pages/register-page.component").then(
            (m) => m.RegisterPageComponent
          ),
      },
    ],
  },
  {
    path: "jobs",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./jobs/pages/jobs-page.component").then(
        (m) => m.JobsPageComponent
      ),
  },
  {
    path: "jobs/new",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./jobs/pages/job-form-page.component").then(
        (m) => m.JobFormPageComponent
      ),
  },
  {
    path: "jobs/:id",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./jobs/pages/job-detail-page.component").then(
        (m) => m.JobDetailPageComponent
      ),
  },
  {
    path: "jobs/:id/edit",
    canActivate: [authGuard],
    loadComponent: () =>
      import("./jobs/pages/job-form-page.component").then(
        (m) => m.JobFormPageComponent
      ),
  },
  {
    path: "**",
    redirectTo: "/jobs",
  },
];

