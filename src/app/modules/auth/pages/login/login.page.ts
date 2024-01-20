import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { LoadingService } from "@core/services/loading.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  protected readonly form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;
  protected wrongCredentials$ = new Subject<boolean>();
  protected showPassword = false;

  public constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _loadingService: LoadingService
  ) {
    this.form = this._formBuilder.nonNullable.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  protected login(): void {
    if (this.form.invalid) return;

    this._loadingService.showLoading();
    this._authService
      .login(this.form.getRawValue())
      .subscribe({
        next: () => {
          this.form.reset();
          return this._router.navigateByUrl("/tabs");
        },
        error: () => this.wrongCredentials$.next(true),
      })
      .add(() => this._loadingService.hideLoading());
  }
}
