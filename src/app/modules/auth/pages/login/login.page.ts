import { ChangeDetectionStrategy, Component } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { MeService } from "@core/services/me.service";
import { switchMap } from "rxjs";

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
  protected showPassword = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _meService: MeService,
    private _router: Router,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
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
        next: () =>
          this._meService
            .getMe()
            .pipe(switchMap(() => this._router.navigateByUrl("/tabs")))
            .subscribe(() => this.form.reset()),
        error: () =>
          this._toastSavingService.showErrorWithMessage("Wrong credentials."),
      })
      .add(() => this._loadingService.hideLoading());
  }
}
