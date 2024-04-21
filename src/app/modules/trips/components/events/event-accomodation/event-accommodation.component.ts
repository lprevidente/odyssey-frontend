import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from "@angular/core";
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
  protected showDelete = signal<boolean>(false);

  constructor() {}

  protected showDeleteBtn(): void {
    this.showDelete.set(true);
  }

  protected hideDeleteBtn(): void {
    this.showDelete.set(false);
  }
}
