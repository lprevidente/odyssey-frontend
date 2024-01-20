import { Component } from "@angular/core";
import { ProfileService } from "@modules/profile/services/profile.service";
import { AuthService } from "@modules/auth/services/auth.service";
import { Profile } from "@modules/profile/models/profile";
import { EMPTY, Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "profile-page.component.html",
  styleUrls: ["profile-page.component.scss"],
})
export class ProfilePage {
  protected profile$: Observable<Profile> = EMPTY;

  public constructor(
    private _profileService: ProfileService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ionViewWillEnter() {
    this.profile$ = this._profileService.getProfile();
  }

  protected async logout() {
    this._authService
      .logout()
      .subscribe()
      .add(() => this._router.navigate(["/auth/login"]));
  }
}
