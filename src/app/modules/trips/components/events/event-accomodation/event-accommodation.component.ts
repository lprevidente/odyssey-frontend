import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Accommodation, Activity } from "@modules/trips/models/activity";
import { EventComponent } from "@modules/trips/components/events/event.component";

@Component({
  selector: "app-event-accommodation",
  templateUrl: "./event-accommodation.component.html",
  styleUrls: ["./event-accommodation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventAccommodationComponent extends EventComponent {
  public activity = input.required<
    Activity & { type: "accommodation" } & Accommodation
  >();
}
