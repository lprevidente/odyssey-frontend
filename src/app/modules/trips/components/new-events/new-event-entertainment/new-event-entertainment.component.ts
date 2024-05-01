import { ChangeDetectionStrategy, Component } from "@angular/core";
import { EntertainmentFormGroup } from "@modules/trips/forms/entertainment.form-group";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";
import { consoleLog } from "@core/utils/rxjs";

@Component({
  selector: "app-new-event-entertainment",
  templateUrl: "./new-event-entertainment.component.html",
  styleUrls: ["./new-event-entertainment.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventEntertainmentComponent extends NewEventComponent {
  protected readonly form = new EntertainmentFormGroup();

  constructor() {
    super();
  }
}
