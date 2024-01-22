import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { Profile } from "@modules/profile/models/profile";
import { ProfileService } from "@modules/profile/services/profile.service";

@Component({
  selector: "app-profile-info",
  templateUrl: "./profile-info.component.html",
  styleUrls: ["./profile-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileInfoComponent {
  protected readonly profile$ = new BehaviorSubject<Profile>({} as Profile);
  protected readonly profilePictureUrl$ = new BehaviorSubject<string>("");

  public constructor(private _profileService: ProfileService) {
    this._getProfile();
  }

  private _getProfile(): void {
    this._profileService
      .getProfile()
      .pipe(tap(profile => this._avatarURL(profile)))
      .subscribe(profile => this.profile$.next(profile));
  }

  private _avatarURL(profile: Profile): void {
    const url = profile.avatarURL || this._getAvatarPlaceholder(profile);
    this.profilePictureUrl$.next(url);
  }

  private _getAvatarPlaceholder(profile: Profile): string {
    const color = profile.sex === "F" ? "FFC0CB" : "87CEEB";
    return `https://ui-avatars.com/api/?name=${profile.firstName}+${profile.lastName}&size=256&background=${color}`;
  }
}
