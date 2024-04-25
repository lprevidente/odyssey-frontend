import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from "@angular/core";

@Component({
  selector: "app-new-event",
  templateUrl: "./new-event.component.html",
  styleUrls: ["./new-event.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventComponent {
  @Output()
  public openModel = new EventEmitter<string>();
}
