import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ThemeToggleComponent } from "./shared/components/theme-toggle/theme-toggle.component";
import { ThemeService } from "./core/services/theme.service";
import { AuthService } from "./auth/services/auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, ThemeToggleComponent, CommonModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(
    private themeService: ThemeService,
    public authService: AuthService
  ) {
    // Initialize services
  }

  logout(): void {
    this.authService.logout();
  }
}
