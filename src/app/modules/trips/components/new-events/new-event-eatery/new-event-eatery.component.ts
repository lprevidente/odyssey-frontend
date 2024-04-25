import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NewEntertainment } from "@modules/trips/models/activity";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";
import { EateryFormGroup } from "@modules/trips/forms/eatery.form-group";

@Component({
  selector: "app-new-event-eatery",
  templateUrl: "./new-event-eatery.component.html",
  styleUrls: ["./new-event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventEateryComponent extends NewEventComponent {
  protected readonly form = new EateryFormGroup();

  constructor() {
    super();
  }

  protected override addActivity(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue() as NewEntertainment;
    this.loadingService.showLoading();
    this.tripService
      .addEateryActivity(this.id(), this.date(), activity)
      .subscribe({
        next: activity => this.showToastAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this.loadingService.hideLoading());
  }
}
