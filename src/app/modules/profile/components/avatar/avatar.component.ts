import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from "@angular/core";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent {
  @Input({ required: true }) public imageUrl!: string;
  @Input({ required: true }) public altText!: string;
  @Input({ required: true }) public size!: string;
  @Output() public imageChanged = new EventEmitter<string>();

  @ViewChild("fileInput") private _fileInput!: ElementRef;

  protected changeAvatar(): void {
    const fileInput = this._fileInput.nativeElement as HTMLInputElement;
    fileInput.click();
  }

  protected onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        this.imageUrl = e.target?.result as string;
        this.imageChanged.emit(this.imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
}
