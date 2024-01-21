import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  passwordMatchValidator,
  passwordRegEx,
} from "@core/validators/password.validator";
import { PasswordService } from "@modules/profile/services/password.service";
import { map, Subject } from "rxjs";
import { LoadingService } from "@core/services/loading.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastSavingService } from "@core/services/toast-saving.service";

@Component({
  selector: "app-last-update-password",
  templateUrl: "./last-update-password.component.html",
  styleUrls: ["./last-update-password.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LastUpdatePasswordComponent {
  protected readonly form: FormGroup;
  protected showPassword = false;
  protected lastUpdatePassword$ = new Subject<string>();

  protected readonly openModal$ = new Subject<boolean>();

  public constructor(
    private _formBuilder: FormBuilder,
    private _loadingService: LoadingService,
    private _passwordService: PasswordService,
    private _toastSavingService: ToastSavingService
  ) {
    this.form = this._formBuilder.nonNullable.group(
      {
        oldPassword: ["", Validators.required],
        password: [
          "",
          [Validators.required, Validators.pattern(passwordRegEx)],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validators: passwordMatchValidator }
    );
    this._getLasUpdatePassword();
  }

  private _getLasUpdatePassword(): void {
    this._passwordService
      .getLastUpdatePassword()
      .pipe(map(lup => this._timeAgo(lup.lastUpdate)))
      .subscribe(lup => this.lastUpdatePassword$.next(lup));
  }

  private _timeAgo(value: string): string {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(value).getTime()) / 1000
    );
    let interval = seconds / 31536000;
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    if (interval > 1) return rtf.format(-Math.floor(interval), "year");

    interval = seconds / 2592000;
    if (interval > 1) return rtf.format(-Math.floor(interval), "month");

    interval = seconds / 86400;
    if (interval > 1) return rtf.format(-Math.floor(interval), "day");

    interval = seconds / 3600;
    if (interval > 1) return rtf.format(-Math.floor(interval), "hour");

    interval = seconds / 60;
    if (interval > 1) return rtf.format(-Math.floor(interval), "minute");

    return rtf.format(-Math.floor(interval), "second");
  }

  protected changePassword(): void {
    if (this.form.invalid) {
      if (this.form.hasError("passwordMismatch"))
        this._toastSavingService.showErrorWithMessage(
          "The passwords don't match."
        );
      return;
    }

    this._loadingService.showLoading();
    this._passwordService
      .updatePassword(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.form.reset();
          this._toastSavingService.showSaved();
          this.openModal$.next(false);
          this._getLasUpdatePassword();
        },
        error: (res: HttpErrorResponse) => {
          if (res.status === 400)
            this._toastSavingService.showErrorWithMessage(
              "The old password is incorrect"
            );
          else this._toastSavingService.showError();
        },
      })
      .add(() => this._loadingService.hideLoading());
  }
}
