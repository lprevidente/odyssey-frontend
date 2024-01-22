import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AppSettingsService } from "@modules/profile/services/app-settings.service";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";

@Component({
  selector: "app-app-settings",
  templateUrl: "./app-settings.page.html",
  styleUrls: ["./app-settings.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppSettingsPage {
  protected readonly form: FormGroup;

  public constructor(
    private _formBuilder: FormBuilder,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService,
    private _appSettingsService: AppSettingsService
  ) {
    this.form = this._formBuilder.group({
      language: ["en-US"],
      currency: ["EUR"],
    });

    this._appSettingsService
      .getAppSettings()
      .subscribe(appSettings => this.form.patchValue(appSettings));
  }

  protected updateSettings(): void {
    this._loadingService.showLoading();
    this._appSettingsService
      .updateAppSettings(this.form.getRawValue())
      .subscribe({
        next: () => this._toastSavingService.showSaved(),
        error: () => this._toastSavingService.showError(),
      })
      .add(() => this._loadingService.hideLoading());
  }
}
