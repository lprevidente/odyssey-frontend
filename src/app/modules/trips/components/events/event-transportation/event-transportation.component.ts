import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
  signal,
} from "@angular/core";
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
  protected showDelete = signal<boolean>(false);

  @Output()
  public deleteEvent = new EventEmitter<Activity>();

  protected deleteActivity(): void {
    this.deleteEvent.emit(this.activity());
    this.hideDeleteBtn();
  }

  protected showDeleteBtn(): void {
    this.showDelete.set(true);
  }

  protected hideDeleteBtn(): void {
    this.showDelete.set(false);
  }
}
