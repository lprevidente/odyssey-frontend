import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NewEntertainment } from "@modules/trips/models/activity";
import { EntertainmentFormGroup } from "@modules/trips/forms/entertainment.form-group";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";

@Component({
  selector: "app-new-event-entertainment",
  templateUrl: "./new-event-entertainment.component.html",
  styleUrls: ["./new-event-entertainment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventEntertainmentComponent extends NewEventComponent {
  protected readonly form = new EntertainmentFormGroup();

  constructor() {
    super();
  }

  protected override addActivity(): void {
    if (this.form.invalid) return;

    const activity = this.form.getRawValue() as NewEntertainment;
    this.loadingService.showLoading();
    this.tripService
      .addEntertainmentActivity(this.id(), this.date(), activity)
      .subscribe({
        next: activity => this.showToastAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this.loadingService.hideLoading());
  }
}
