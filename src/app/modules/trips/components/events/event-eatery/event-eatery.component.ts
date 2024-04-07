import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Activity, Eatery } from "@modules/trips/models/activity";

@Component({
  selector: "app-event-eatery",
  templateUrl: "./event-eatery.component.html",
  styleUrls: ["./event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEateryComponent {
  public activity = input.required<Activity & { type: "eatery" } & Eatery>();

  public constructor() {}
}
