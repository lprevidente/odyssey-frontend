import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NewAccommodation } from "@modules/trips/models/activity";
import { AccommodationFormGroup } from "@modules/trips/forms/accommodation.form-group";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";

@Component({
  selector: "app-new-event-accommodation",
  templateUrl: "./new-event-accommodation.component.html",
  styleUrls: ["./new-event-accommodation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventAccommodationComponent extends NewEventComponent {
  protected readonly form = new AccommodationFormGroup();

  constructor() {
    super();
  }

  protected addActivity(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue() as NewAccommodation;
    this.loadingService.showLoading();
    this.tripService
      .addAccommodationActivity(this.id(), this.date(), activity)
      .subscribe({
        next: activity => this.showToastAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this.loadingService.hideLoading());
  }
}
