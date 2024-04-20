import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Activity, Entertainment } from "@modules/trips/models/activity";

@Component({
  selector: "app-event-entertainment",
  templateUrl: "./event-entertainment.component.html",
  styleUrls: ["./event-entertainment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEntertainmentComponent {
  public activity = input.required<
    Activity & { type: "entertainment" } & Entertainment
  >();

  constructor() {}
}
