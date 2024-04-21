import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from "@angular/core";
import { Activity, Eatery } from "@modules/trips/models/activity";

@Component({
  selector: "app-event-eatery",
  templateUrl: "./event-eatery.component.html",
  styleUrls: ["./event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventEateryComponent {
  public activity = input.required<Activity & { type: "eatery" } & Eatery>();
  protected showDelete = signal<boolean>(false);

  constructor() {}

  protected showDeleteBtn(): void {
    this.showDelete.set(true);
  }

  protected hideDeleteBtn(): void {
    this.showDelete.set(false);
  }
}
