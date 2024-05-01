import {
  ChangeDetectionStrategy,
  Component,
  Input,
  input,
  signal,
} from "@angular/core";
import { Activity, trackByActivityId } from "@modules/trips/models/activity";
import { Place } from "@modules/trips/models/address";
import { LoadingService } from "@core/services/loading.service";
import { TripService } from "@modules/trips/services/trip.service";
import { ToastSavingService } from "@core/services/toast-saving.service";

@Component({
  selector: "app-timeline",
  templateUrl: "./timeline.component.html",
  styleUrls: ["./timeline.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent {
  public id = input.required<string>();
  public date = input.required<Date>();
  public place = input.required<Place>();

  protected readonly trackByActivityId = trackByActivityId;

  protected activities = signal<Activity[]>([]);
  protected activityToDelete: Activity | null = null;

  protected readonly openActionSheet = signal<boolean>(false);
  protected readonly actionSheetButtons = [
    { text: "Delete", role: "destructive", data: { action: "delete" } },
    { text: "Cancel", role: "cancel", data: { action: "cancel" } },
  ];

  protected readonly isModalOpen = signal<{
    accommodation: boolean;
    transportation: boolean;
    entertainment: boolean;
    eatery: boolean;
  }>({
    accommodation: false,
    transportation: false,
    entertainment: false,
    eatery: false,
  });

  constructor(
    private _loadingService: LoadingService,
    private _tripService: TripService,
    private _toastSavingService: ToastSavingService
  ) {}

  @Input({ alias: "activities", required: true })
  public set _activities(activities: Activity[]) {
    this.activities.set(activities);
  }

  protected addActivity(activity: Activity): void {
    this.activities.update(activities => [...activities, activity]);
  }

  protected deleteActivity(activity: Activity): void {
    this.activityToDelete = activity;
    this.openActionSheet.set(true);
  }

  protected newActivity(type: string): void {
    this.activityToUpdate.set(null);
    this._openModal(type);
  }

  private _openModal(type: string): void {
    this.isModalOpen.update(modal => ({ ...modal, [type]: true }));
  }

  protected actionResult(event: CustomEvent): void {
    if (event.detail.role !== "destructive" || !this.activityToDelete) return;
    this.openActionSheet.set(false);
    this._loadingService.showLoading();
    const activityId = this.activityToDelete.id;
    this._tripService
      .deleteActivity(this.id(), this.date(), activityId)
      .subscribe({
        next: () => this.removeActivity(activityId),
        error: () => this._toastSavingService.showError(),
      })
      .add(() => this._loadingService.hideLoading());
  }

  protected removeActivity(activityId: string): void {
    this.activities.update(activities =>
      activities.filter(a => a.id !== activityId)
    );
    this._toastSavingService.showSaved();
    this.activityToDelete = null;
  }

  protected readonly activityToUpdate = signal<Activity | null>(null);

  protected openModalActivity(activity: Activity): void {
    this.activityToUpdate.set(activity);
    this._openModal(activity.type);
  }

  protected updateActivity(activity: Activity): void {
    console.log("Activity to update", activity);
    this.activities.update(activities =>
      activities.map(a => (a.id === activity.id ? activity : a))
    );
    this._toastSavingService.showSaved();
  }
}
