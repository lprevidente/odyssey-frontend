import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  OnInit,
  Output,
  signal,
} from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Activity, NewTransportation } from "@modules/trips/models/activity";
import { TripService } from "@modules/trips/services/trip.service";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { Place } from "@modules/trips/models/address";

@Component({
  selector: "app-new-event-transportation",
  templateUrl: "./new-event-transportation.component.html",
  styleUrls: ["./new-event-transportation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventTransportationComponent implements OnInit {
  public date = input.required<Date>();
  public id = input.required<string>();
  public place = input.required<Place>();

  @Output()
  public activityAdded = new EventEmitter<Activity>();

  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: unknown = null;
  protected form = this._formBuilder.group({
    name: ["", Validators.required],
    notes: [null],
    means: ["bus", Validators.required],
    from: [{} as Place, Validators.required],
    to: [{} as Place, Validators.required],
    departureTime: [null],
    arrivalTime: [null],
    link: [null],
    number: [null],
    expense: [null],
  });

  protected readonly transportationTypes = [
    { value: "walk", label: "Walk" },
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train/Metro" },
    { value: "airplane", label: "Airplane" },
    { value: "car", label: "Car" },
  ];

  protected readonly trackBy: (index: number) => number = (index: number) =>
    index;

  constructor(
    private _formBuilder: FormBuilder,
    private _tripService: TripService,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
  ) {}

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

  protected addActivity(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue() as NewTransportation;
    this._loadingService.showLoading();
    this._tripService
      .addTransportationActivity(this.id(), this.date(), activity)
      .subscribe({
        next: activity => this.showToastAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this._loadingService.hideLoading());
  }

  protected showToastAndClose(activity: Activity): void {
    this._toastSavingService.showSaved();
    this.activityAdded.emit(activity);
    this.close();
  }

  protected showErrorMessages(): void {
    this._toastSavingService.showErrorWithMessage(
      "An error occurred while adding the eatery activity."
    );
  }
}
