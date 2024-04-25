import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { Activity, Eatery } from "@modules/trips/models/activity";
import { EventComponent } from "@modules/trips/components/events/event.component";

@Component({
  selector: "app-event-eatery",
  templateUrl: "./event-eatery.component.html",
  styleUrls: ["./event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEateryComponent extends EventComponent {
  public activity = input.required<Activity & { type: "eatery" } & Eatery>();
}
