import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
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
export class AppComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
    public authService: AuthService,
    private router: Router
  ) {
    // Initialize services
  }

  ngOnInit(): void {
    // Handle GitHub Pages 404 redirect - restore original path if stored
    const storedPath = sessionStorage.getItem('ghPagesOriginalPath');
    if (storedPath) {
      sessionStorage.removeItem('ghPagesOriginalPath');
      // Navigate to the stored path
      this.router.navigateByUrl(storedPath, { replaceUrl: true });
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
