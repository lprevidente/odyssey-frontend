import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "@modules/auth/services/auth.service";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import {
  passwordMatchValidator,
  passwordRegEx,
} from "@core/validators/password.validator";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignupPage {
  protected readonly form: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;
  protected showPassword = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
  ) {
    this.form = this._formBuilder.nonNullable.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [Validators.required, Validators.pattern(passwordRegEx)],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  protected submit(): void {
    if (this.form.invalid) {
      if (this.form.hasError("passwordMismatch"))
        this._toastSavingService.showErrorWithMessage(
          "The passwords don't match."
        );
      return;
    }

    this._loadingService.showLoading();
    this._authService
      .signup({
        ...this.form.getRawValue(),
        appSettings: {
          language: "en-US",
          currency: "EUR",
        },
      })
      .subscribe({
        next: () => {
          this.form.reset();
          this._router.navigateByUrl("/tabs");
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.title === "email_already_exist")
            this._toastSavingService.showErrorWithMessage(
              "Email already exists."
            );
          else this._toastSavingService.showError();
        },
      })
      .add(() => this._loadingService.hideLoading());
  }
}
