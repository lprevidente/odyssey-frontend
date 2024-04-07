import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Activity, Transportation } from "@modules/trips/models/activity";

@Component({
  selector: "app-event-transportation",
  templateUrl: "./event-transportation.component.html",
  styleUrls: ["./event-transportation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTransportationComponent {
  public activity = input.required<
    Activity & { type: "transportation" } & Transportation
  >();

  public constructor() {}
}
