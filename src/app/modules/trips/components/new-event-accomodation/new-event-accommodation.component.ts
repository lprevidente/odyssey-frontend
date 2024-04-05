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
  selector: "app-new-event-accommodation",
  templateUrl: "./new-event-accommodation.component.html",
  styleUrls: ["./new-event-accommodation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventAccommodationComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: globalThis.Element | null = null;

  protected form = this._formBuilder.group({
    name: [null, Validators.required],
    description: [null],
    place: [null, Validators.required],
    booked: [false],
    time: [null],
    link: [null],
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
