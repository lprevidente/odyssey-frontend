import { Component } from "@angular/core";
import { AuthService } from "@modules/auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "profile-page.component.html",
  styleUrls: ["profile-page.component.scss"],
})
export class ProfilePage {
  public constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  protected async logout(): Promise<void> {
    this._authService.logout();
    await this._router.navigateByUrl("/auth/login");
  }
}
