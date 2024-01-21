import { Component, OnInit } from "@angular/core";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
  protected readonly isLoading$;

  public constructor(
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
  ) {
    this.isLoading$ = this._loadingService.isLoading$;
  }

  protected get saved$(): Observable<boolean> {
    return this._toastSavingService.saved$;
  }

  protected get error$(): Observable<string | null> {
    return this._toastSavingService.error$;
  }

  protected hideSaved(): void {
    this._toastSavingService.hideSaved();
  }

  protected hideError(): void {
    this._toastSavingService.hideError();
  }

  public ngOnInit(): void {
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
  }
}
