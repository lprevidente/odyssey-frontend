import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";
import { EateryFormGroup } from "@modules/trips/forms/eatery.form-group";

@Component({
  selector: "app-new-event-eatery",
  templateUrl: "./new-event-eatery.component.html",
  styleUrls: ["./new-event-eatery.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventEateryComponent extends NewEventComponent {
  protected readonly form = new EateryFormGroup();

  constructor() {
    super();
  }
}
