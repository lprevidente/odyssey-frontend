import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Activity, Transportation } from "@modules/trips/models/activity";
import { EventComponent } from "@modules/trips/components/events/event.component";

@Component({
  selector: "app-event-transportation",
  templateUrl: "./event-transportation.component.html",
  styleUrls: ["./event-transportation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTransportationComponent extends EventComponent {
  public activity = input.required<
    Activity & { type: "transportation" } & Transportation
  >();
}
