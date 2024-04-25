import { TripService } from "@modules/trips/services/trip.service";
import { LoadingService } from "@core/services/loading.service";
import { ToastSavingService } from "@core/services/toast-saving.service";
import {
  Directive,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  signal,
} from "@angular/core";
import { Activity } from "@modules/trips/models/activity";
import { Place } from "@modules/trips/models/address";
import { getTextFromClipboard } from "@core/utils/common";
import { ActivityFormGroup } from "@modules/trips/forms/activity.form-group";

@Directive()
export abstract class NewEventComponent {
  public date = input.required<Date>();
  public id = input.required<string>();
  public place = input.required<Place>();

  protected tripService = inject(TripService);
  protected loadingService = inject(LoadingService);
  private _toastSavingService = inject(ToastSavingService);

  protected readonly isModalOpen = signal<boolean>(false);
  protected readonly presentingElement: unknown;

  @Output()
  public add = new EventEmitter<Activity>();

  protected constructor() {
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

  @Input()
  public set activity(value: Activity) {
    this.form.patchValue(value);
  }

  protected abstract get form(): ActivityFormGroup;

  protected abstract addActivity(): void;

  protected showToastAndClose(activity: Activity): void {
    this._toastSavingService.showSaved();
    this.add.emit(activity);
    this.close();
  }

  protected showErrorMessages(): void {
    this._toastSavingService.showErrorWithMessage(
      "An error occurred while adding the eatery activity."
    );
  }

  protected async pasteFromClipboard(): Promise<void> {
    const text = await getTextFromClipboard();
    this.form.controls["link"].setValue(text);
  }
}
