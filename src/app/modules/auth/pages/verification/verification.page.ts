import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { VerificationService } from "@modules/auth/services/verification.service";
import { switchMap } from "rxjs";
import { MeService } from "@core/services/me.service";

@Component({
  selector: "app-verification",
  templateUrl: "./verification.page.html",
  styleUrls: ["./verification.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificationPage {
  protected readonly form: FormGroup<{
    code: FormControl<string>;
  }>;

  public constructor(
    private _formBuilder: FormBuilder,
    private _meService: MeService,
    private _verificationService: VerificationService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
  ) {
    this.form = this._formBuilder.nonNullable.group({
      code: ["", Validators.pattern(/^[0-9]{6}$/)],
    });
    this._verificationService.getConfirmationEmail().subscribe();
  }

  protected submit(): void {
    if (this.form.invalid) {
      return;
    }

    this._loadingService.showLoading();
    this._verificationService
      .verifyIdentity(this.form.getRawValue())
      .subscribe({
        next: () =>
          this._meService
            .getMe()
            .pipe(switchMap(() => this._router.navigateByUrl("/tabs")))
            .subscribe(() => this.form.reset()),
        error: (error: HttpErrorResponse) => this._handleError(error),
      })
      .add(() => this._loadingService.hideLoading());
  }

  private _handleError(error: HttpErrorResponse): void {
    if (error.error.title === "confirmation_code_not_valid")
      this._toastSavingService.showErrorWithMessage(
        "The code is not valid. Please try again."
      );
    else this._toastSavingService.showError();
  }
}
