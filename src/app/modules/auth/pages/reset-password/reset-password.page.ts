import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ResetPasswordService } from "@modules/auth/services/reset-password.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import {
  passwordMatchValidator,
  passwordRegEx,
} from "@core/validators/password.validator";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-password-forgot",
  templateUrl: "./reset-password.page.html",
  styleUrls: ["./reset-password.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordPage {
  protected readonly form: FormGroup<{
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  protected readonly code: string;
  protected showPassword = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRouter: ActivatedRoute,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService,
    private _resetPasswordService: ResetPasswordService
  ) {
    this.code = this._activatedRouter.snapshot.queryParams["code"];
    this.form = this._formBuilder.nonNullable.group(
      {
        password: [
          "",
          [Validators.required, Validators.pattern(passwordRegEx)],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  protected resetPassword(): void {
    if (this.form.invalid) return;

    this._loadingService.showLoading();
    this._resetPasswordService
      .resetPassword({ ...this.form.getRawValue(), code: this.code })
      .subscribe({
        next: () =>
          this._router
            .navigateByUrl("/auth/login")
            .then(() => this.form.reset()),
        error: error => this._handleError(error),
      })
      .add(() => this._loadingService.hideLoading());
  }

  private _handleError(error: HttpErrorResponse): void {
    if (error.status === 400)
      this._toastSavingService.showErrorWithMessage("Invalid reset code");
    else this._toastSavingService.showError();
  }
}
