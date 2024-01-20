import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "@modules/auth/services/auth.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { passwordMatchValidator } from "@core/validators/password.validator";
import { LoadingService } from "@core/services/loading.service";

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
  private readonly _passwordRegEx =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[@#$%^&+=-_!])(?=\S+$).{8,}$/;
  protected showPassword = false;
  protected passwordDontMatch = false;
  protected emailAlreadyExists$ = new Subject<boolean>();
  protected errorSignUp$ = new Subject<boolean>();

  public constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService
  ) {
    this.form = this._formBuilder.nonNullable.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [Validators.required, Validators.pattern(this._passwordRegEx)],
        ],
        confirmPassword: ["", Validators.required],
      },
      { validators: passwordMatchValidator }
    );
  }

  protected submit(): void {
    if (this.form.invalid) {
      if (this.form.hasError("passwordMismatch")) this.passwordDontMatch = true;
      return;
    }

    this._loadingService.showLoading();

    this._authService
      .signup({
        ...this.form.getRawValue(),
        appSettings: {
          language: navigator.language ?? "en",
          currency: navigator.language === "en" ? "USD" : "EUR",
        },
      })
      .subscribe({
        next: () => {
          this.form.reset();
          this._router.navigateByUrl("/tabs");
        },
        error: (error: HttpErrorResponse) => {
          if (error.error.title === "email_already_exist")
            this.emailAlreadyExists$.next(true);
          else this.errorSignUp$.next(true);
        },
      })
      .add(() => this._loadingService.hideLoading());
  }
}
