import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Output,
  signal,
} from "@angular/core";
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
