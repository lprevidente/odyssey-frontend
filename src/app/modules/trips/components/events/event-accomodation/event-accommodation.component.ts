import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Accommodation, Activity } from "@modules/trips/models/activity";

@Component({
  selector: "app-event-accommodation",
  templateUrl: "./event-accommodation.component.html",
  styleUrls: ["./event-accommodation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventAccommodationComponent {
  public activity = input.required<
    Activity & { type: "accommodation" } & Accommodation
  >();

  public constructor() {}
}
