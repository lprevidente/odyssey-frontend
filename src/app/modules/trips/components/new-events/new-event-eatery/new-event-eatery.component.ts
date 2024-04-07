import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
} from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { getTextFromClipboard } from "@core/utils/common";

@Component({
  selector: "app-new-event-eatery",
  templateUrl: "./new-event-eatery.component.html",
  styleUrls: ["./new-event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventEateryComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: unknown = null;
  protected form = this._formBuilder.group({
    name: [null, Validators.required],
    note: [null],
    place: [null, Validators.required],
    booked: [false],
    time: [null],
    link: new FormControl<string | null>(null),
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

  protected async pasteFromClipboard(): Promise<void> {
    const text = await getTextFromClipboard();
    this.form.controls.link.setValue(text);
  }
}
