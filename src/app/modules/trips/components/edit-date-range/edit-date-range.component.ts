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
import { TripService } from "@modules/trips/services/trip.service";
import { CalendarComponentOptions } from "@googlproxer/ion-range-calendar";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { DateRange } from "@modules/trips/models/date-range";

@Component({
  selector: "app-edit-date-range",
  templateUrl: "./edit-date-range.component.html",
  styleUrls: ["./edit-date-range.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditDateRangeComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected readonly options: CalendarComponentOptions = { pickMode: "range" };
  protected presentingElement: unknown = null;
  protected form = this._formBuilder.group({
    dateRange: new FormControl<DateRange | null>(null, Validators.required),
  });

  public id = input.required<string>();

  @Output()
  public dateRangeChange = new EventEmitter<DateRange>();

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

  @Input({ required: true })
  public set dateRange(value: DateRange) {
    this.form.patchValue({ dateRange: value });
  }

  protected addPlace(): void {
    if (this.form.invalid) return;
    const dateRange = this.form.getRawValue().dateRange!;
    this._loadingService.showLoading();
    this._tripService
      .updateDateRange(this.id(), dateRange)
      .subscribe({
        next: () => this.showToastAndClose(dateRange),
        error: () => this.showErrorMessage(),
      })
      .add(() => this._loadingService.hideLoading());
  }

  private showToastAndClose(dateRange: DateRange) {
    this._toastSavingService.showSaved();
    this.dateRangeChange.emit(dateRange);
    this.close();
  }

  private showErrorMessage() {
    this._toastSavingService.showErrorWithMessage(
      "Error while updating date range. Please try again."
    );
  }
}
