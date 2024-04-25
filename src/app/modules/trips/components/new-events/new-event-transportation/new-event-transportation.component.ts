import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NewTransportation } from "@modules/trips/models/activity";
import { TransportationFormGroup } from "@modules/trips/forms/transportation.form-group";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";

@Component({
  selector: "app-new-event-transportation",
  templateUrl: "./new-event-transportation.component.html",
  styleUrls: ["./new-event-transportation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventTransportationComponent extends NewEventComponent {
  protected readonly form = new TransportationFormGroup();

  protected readonly transportationTypes = [
    { value: "walk", label: "Walk" },
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train/Metro" },
    { value: "airplane", label: "Airplane" },
    { value: "car", label: "Car" },
  ];

  protected readonly trackBy: (index: number) => number = (index: number) =>
    index;

  constructor() {
    super();
  }

  protected override addActivity(): void {
    if (this.form.invalid) return;
    const activity = this.form.getRawValue() as NewTransportation;
    this.loadingService.showLoading();
    this.tripService
      .addTransportationActivity(this.id(), this.date(), activity)
      .subscribe({
        next: activity => this.showToastAndClose(activity),
        error: () => this.showErrorMessages(),
      })
      .add(() => this.loadingService.hideLoading());
  }
}
