import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { AvatarService } from "@modules/profile/services/avatar.service";
import { Observable, Subject, tap } from "rxjs";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { Profile } from "@modules/profile/models/profile";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  @Input({ required: true }) public profile$!: Observable<Profile>;
  @Input({ required: true }) public size!: string;
  @Output() public imageChanged = new EventEmitter<string>();

  @ViewChild("fileInput") private _fileInput!: ElementRef;

  protected readonly openActions$ = new Subject<boolean>();
  protected readonly profilePictureUrl$ = new Subject<string>();
  private _profile: Profile = {} as Profile;

  public constructor(
    private _avatarService: AvatarService,
    private _toastSavingService: ToastSavingService
  ) {}

  protected get actionSheetButtons(): { text: string; role: string }[] {
    const base = [
      { text: "Upload", role: "upload" },
      { text: "Cancel", role: "cancel" },
    ];
    if (!this._profile.avatarURL) return base;
    return [{ text: "Delete", role: "destructive" }, ...base];
  }

  protected openActionSheet(): void {
    this.openActions$.next(true);
  }

  public ngOnInit(): void {
    this.profile$
      .pipe(tap(p => (this._profile = p)))
      .subscribe(() => this._avatarURL());
  }

  protected actionResult(event: CustomEvent): void {
    if (event.detail.role === "destructive")
      this._avatarService.deleteAvatar().subscribe({
        next: () => {
          this._toastSavingService.showSaved();
          this.profilePictureUrl$.next(this._getAvatarPlaceholder());
        },
        error: () => this._toastSavingService.showError(),
      });
    else if (event.detail.role === "upload") this.changeAvatar();
    this.openActions$.next(false);
  }

  private _avatarURL(): void {
    const url = this._profile.avatarURL ?? this._getAvatarPlaceholder();
    this.profilePictureUrl$.next(url);
  }

  private _getAvatarPlaceholder(): string {
    const color = this._profile.sex === "F" ? "FFC0CB" : "87CEEB";
    return `https://ui-avatars.com/api/?name=${this._profile.firstName}+${this._profile.lastName}&size=256&background=${color}`;
  }

  protected changeAvatar(): void {
    const fileInput = this._fileInput.nativeElement as HTMLInputElement;
    fileInput.click();
  }

  protected onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (!file) return;
    this._avatarService.uploadAvatar(file).subscribe({
      next: url => {
        this._toastSavingService.showSaved();
        this.profilePictureUrl$.next(url);
      },
      error: () => this._toastSavingService.showError(),
    });
  }
}
