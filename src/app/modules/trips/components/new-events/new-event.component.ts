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
import { ActivityService } from "@modules/trips/services/activity.service";

@Directive()
export abstract class NewEventComponent {
  public date = input.required<Date>();
  public tripId = input.required<string>();
  public place = input.required<Place>();

  protected id = "";
  protected activityService = inject(ActivityService);
  protected loadingService = inject(LoadingService);
  private _toastSavingService = inject(ToastSavingService);
  protected readonly isModalOpen = signal<boolean>(false);

  @Output()
  public add = new EventEmitter<Activity>();

  @Output()
  public update = new EventEmitter<Activity>();

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
  public set activity(value: Activity | null) {
    if (!value) return;
    this.id = value.id;
    this.form.patchValue(value);
  }

  protected abstract get form(): ActivityFormGroup;

  protected saveActivity(): void {
    this.isUpdating ? this._updateActivity() : this._addActivity();
  }

  private _addActivity(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue();
    this.loadingService.showLoading();
    this.activityService
      .addActivity(this.tripId(), this.date(), activity)
      .subscribe({
        next: activity => this._showToastEmitAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this.loadingService.hideLoading());
  }

  private _updateActivity(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue();
    this.loadingService.showLoading();
    this.activityService
      .updateActivity(this.tripId(), this.date(), this.id, activity)
      .subscribe({
        next: () => this._showToastAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this.loadingService.hideLoading());
  }

  protected get isUpdating(): boolean {
    return !!this.id;
  }

  private _showToastEmitAndClose(activity: Activity): void {
    this._toastSavingService.showSaved();
    this.add.emit(activity);
    this.close();
  }

  private _showToastAndClose(activity: Activity): void {
    this._toastSavingService.showSaved();
    this.update.emit({ ...activity, id: this.id });
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
