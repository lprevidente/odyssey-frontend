import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  public ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Initialize the dark theme based on the initial
    // value of the prefers-color-scheme media query
    this._initializeDarkTheme(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener("change", mediaQuery =>
      this._initializeDarkTheme(mediaQuery.matches)
    );
  }

  private _initializeDarkTheme(isDark: boolean): void {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#000000" : "#ffd534");

    console.log(
      document
        .querySelector('meta[name="theme-color"]')
        ?.getAttribute("content")
    );
  }
}
