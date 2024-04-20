import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
} from "@angular/core";
import { Activity } from "@modules/trips/models/activity";

@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent {
  public id = input.required<string>();
  public date = input.required<Date>();

  protected isTransportationOpen = false;
  protected isEateryOpen = false;
  protected isAccommodationOpen = false;
  protected isEntertainmentOpen = false;

  @Output()
  public activityAdded = new EventEmitter<Activity>();

  protected propagate(event: Activity): void {
    this.activityAdded.emit(event);
  }
}
