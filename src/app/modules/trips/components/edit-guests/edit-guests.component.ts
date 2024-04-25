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
import { TripService } from "@modules/trips/services/trip.service";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import { People } from "@modules/trips/models/people";

@Component({
  selector: "app-edit-guests",
  templateUrl: "./edit-guests.component.html",
  styleUrls: ["./edit-guests.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditGuestsComponent implements OnInit {
  protected readonly isModalOpen = signal<boolean>(false);
  protected presentingElement: unknown = null;
  protected form = this._formBuilder.group({
    adults: [0, [Validators.required, Validators.min(1)]],
    children: [0, Validators.required],
  });

  public id = input.required<string>();

  @Output()
  public guestsChange = new EventEmitter<People>();

  constructor(
    private _formBuilder: FormBuilder,
    private _tripService: TripService,
    private _loadingService: LoadingService,
    private _toastSavingService: ToastSavingService
  ) {}

  public ngOnInit(): void {
    this.presentingElement = document.querySelector(".ion-page");
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
  public set guests(value: People) {
    this.form.patchValue(value);
  }

  protected addPlace(): void {
    if (this.form.invalid) return;
    const guests = this.form.getRawValue() as People;
    this._loadingService.showLoading();
    this._tripService
      .updatePeople(this.id(), guests)
      .subscribe({
        next: () => this.showToastAndClose(guests),
        error: () => this.showErrorMessage(),
      })
      .add(() => this._loadingService.hideLoading());
  }

  private showToastAndClose(people: People) {
    this._toastSavingService.showSaved();
    this.guestsChange.emit(people);
    this.close();
  }

  private showErrorMessage() {
    this._toastSavingService.showErrorWithMessage(
      "Error while updating guests. Please try again."
    );
  }
}
