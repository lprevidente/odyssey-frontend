import { Component } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { AuthService } from "@modules/auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.page.html",
  styleUrls: ["./signup.page.scss"],
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
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
  protected showPassword = false;
  protected passwordDontMatch = false;
  protected errorSignUp = false;

  private _passwordMatchValidator = (
    control: AbstractControl<unknown>
  ): ValidationErrors | null => {
    const password = control.get("password");
    const confirmPassword = control.get("confirmPassword");

    return password &&
      confirmPassword &&
      password.value !== confirmPassword.value
      ? { passwordMismatch: true }
      : null;
  };

  public constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.form = this._formBuilder.nonNullable.group(
      {
        firstName: ["", Validators.required],
        lastName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        confirmPassword: ["", Validators.required],
      },
      { validators: this._passwordMatchValidator }
    );
  }

  protected submit(): void {
    if (this.form.invalid) {
      if (this.form.hasError("passwordMismatch")) this.passwordDontMatch = true;
      return;
    }

    this._authService
      .signup({
        ...this.form.getRawValue(),
        appSettings: {
          language: navigator.language ?? "en",
          currency: navigator.language === "en" ? "USD" : "EUR",
        },
      })
      .subscribe({
        next: () => this._router.navigateByUrl("/tabs"),
        error: () => (this.errorSignUp = true),
      });
  }
}
