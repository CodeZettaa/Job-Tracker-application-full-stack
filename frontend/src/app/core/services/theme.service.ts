import { Injectable, signal, effect } from "@angular/core";

export type Theme = "light" | "dark";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private readonly THEME_KEY = "job-tracker-theme";
  theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Apply theme on initialization
    this.applyTheme(this.theme());

    // Watch for theme changes and apply them
    effect(() => {
      this.applyTheme(this.theme());
      this.saveTheme(this.theme());
    });
  }

  private getInitialTheme(): Theme {
    // Check localStorage first
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    }

    // Check system preference
    if (
      typeof globalThis !== "undefined" &&
      "matchMedia" in globalThis &&
      globalThis.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return "dark";
    }

    return "light";
  }

  toggleTheme(): void {
    this.theme.set(this.theme() === "light" ? "dark" : "light");
  }

  setTheme(theme: Theme): void {
    this.theme.set(theme);
  }

  private applyTheme(theme: Theme): void {
    const root = document.documentElement;
    root.dataset["theme"] = theme;
  }

  private saveTheme(theme: Theme): void {
    if (typeof globalThis !== "undefined" && "localStorage" in globalThis) {
      localStorage.setItem(this.THEME_KEY, theme);
    }
  }
}
