import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ProfileService } from "@modules/profile/services/profile.service";
import { AuthService } from "@modules/auth/services/auth.service";
import { map, switchMap } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-delete-account",
  templateUrl: "./delete-account.component.html",
  styleUrls: ["./delete-account.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteAccountComponent {
  protected readonly actionSheetButtons = [
    { text: "Delete", role: "destructive", data: { action: "delete" } },
    { text: "Cancel", role: "cancel", data: { action: "cancel" } },
  ];

  constructor(
    private _profileService: ProfileService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  public deleteProfile(): void {
    this._profileService
      .deleteProfile()
      .pipe(
        switchMap(() => this._authService.logout()),
        map(() => this._router.navigate(["/auth/login"]))
      )
      .subscribe();
  }

  protected actionResult(event: CustomEvent): void {
    if (event.detail.role === "destructive") this.deleteProfile();
  }
}
