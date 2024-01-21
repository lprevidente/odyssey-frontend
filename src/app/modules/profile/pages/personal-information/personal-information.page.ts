import { Component } from "@angular/core";
import { LoadingService } from "@core/services/loading.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ProfileService } from "@modules/profile/services/profile.service";
import { Sex } from "@modules/profile/models/profile";
import { ToastSavingService } from "@core/services/toast-saving.service";

@Component({
  selector: "app-personal-information",
  templateUrl: "./personal-information.page.html",
  styleUrls: ["./personal-information.page.scss"],
})
export class PersonalInformationPage {
  protected readonly form: FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    email: FormControl<string>;
    sex: FormControl<Sex>;
  }>;

  public constructor(
    private _formBuilder: FormBuilder,
    private _profileService: ProfileService,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
  ) {
    this.form = this._formBuilder.nonNullable.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      sex: new FormControl<Sex>("M", {
        nonNullable: true,
        validators: Validators.required,
      }),
    });

    this._profileService
      .getProfile()
      .subscribe(profile => this.form.patchValue(profile));
  }

  public saveChanges(): void {
    if (this.form.invalid) return;

    this._loadingService.showLoading();
    this._profileService
      .updateProfile(this.form.getRawValue())
      .subscribe({
        next: () => this._toastSavingService.showSaved(),
        error: () => this._toastSavingService.showError(),
      })
      .add(() => this._loadingService.hideLoading());
  }
}
