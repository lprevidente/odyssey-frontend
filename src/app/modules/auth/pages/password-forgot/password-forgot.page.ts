import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ResetPasswordService } from "@modules/auth/services/reset-password.service";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-password-forgot",
  templateUrl: "./password-forgot.page.html",
  styleUrls: ["./password-forgot.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordForgotPage {
  protected readonly sent$ = new BehaviorSubject<boolean>(false);
  protected readonly form: FormGroup<{
    email: FormControl<string>;
  }>;

  public constructor(
    private _formBuilder: FormBuilder,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService,
    private _resetPasswordService: ResetPasswordService
  ) {
    this.form = this._formBuilder.nonNullable.group({
      email: ["", [Validators.required, Validators.email]],
    });
  }

  protected resetCode(): void {
    if (this.form.invalid) return;

    this._loadingService.showLoading();
    this._resetPasswordService
      .getResetPasswordCode(this.form.getRawValue())
      .subscribe({
        next: () => this.sent$.next(true),
        error: () => this._toastSavingService.showError(),
      })
      .add(() => this._loadingService.hideLoading());
  }
}
