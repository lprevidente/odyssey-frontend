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
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { getTextFromClipboard } from "@core/utils/common";
import { Activity, NewEntertainment } from "@modules/trips/models/activity";
import { TripService } from "@modules/trips/services/trip.service";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { Place } from "@modules/trips/models/address";

@Component({
  selector: "app-new-event-eatery",
  templateUrl: "./new-event-eatery.component.html",
  styleUrls: ["./new-event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventEateryComponent implements OnInit {
  public date = input.required<Date>();
  public id = input.required<string>();

  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: unknown = null;
  protected form = this._formBuilder.group({
    name: ["", Validators.required],
    notes: [null],
    place: [{} as Place, Validators.required],
    reservation: [false],
    time: [null],
    link: new FormControl<string | null>(null),
  });

  @Output()
  public activityAdded = new EventEmitter<Activity>();

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

  protected addPlace(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue() as NewEntertainment;
    this._loadingService.showLoading();
    this._tripService
      .addEateryActivity(this.id(), this.date(), activity)
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

  protected async pasteFromClipboard(): Promise<void> {
    const text = await getTextFromClipboard();
    this.form.controls.link.setValue(text);
  }
}
