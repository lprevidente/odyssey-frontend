import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-edit-guests",
  templateUrl: "./edit-guests.component.html",
  styleUrls: ["./edit-guests.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGuestsComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: globalThis.Element | null = null;
  protected form = this._formBuilder.group({
    adults: [0, [Validators.required, Validators.min(1)]],
    children: [0, Validators.required],
  });

  public constructor(private _formBuilder: FormBuilder) {}

  public ngOnInit(): void {
    this.presentingElement = document.querySelector(".ion-pages");
  }

  protected close(): void {
    this.isModalOpen.set(false);
    this.openModelChange.emit(false);
  }

  @Output()
  public openModelChange = new EventEmitter<boolean>();

  @Input()
  public set openModel(value: boolean) {
    this.isModalOpen.set(value);
  }

  protected addPlace(): void {
    console.log(this.form.value);
    if (this.form.invalid) return;
    this.close();
  }
}
