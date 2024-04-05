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
  selector: "app-new-event-transportation",
  templateUrl: "./new-event-transportation.component.html",
  styleUrls: ["./new-event-transportation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventTransportationComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: globalThis.Element | null = null;
  protected form = this._formBuilder.group({
    name: [null, Validators.required],
    note: [null],
    means: ["bus", Validators.required],
    from: [null, Validators.required],
    to: [null, Validators.required],
    departureTime: [null],
    arrivalTime: [null],
  });

  protected readonly transportationMeans = [
    { value: "walk", label: "Walk" },
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train/Metro" },
    { value: "airplane", label: "Airplane" },
    { value: "car", label: "Car" },
  ];

  protected readonly trackBy: (index: number) => number = (index: number) =>
    index;

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
