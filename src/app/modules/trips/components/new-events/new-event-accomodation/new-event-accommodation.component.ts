import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AccommodationFormGroup } from "@modules/trips/forms/accommodation.form-group";
import { NewEventComponent } from "@modules/trips/components/new-events/new-event.component";

@Component({
  selector: "app-new-event-accommodation",
  templateUrl: "./new-event-accommodation.component.html",
  styleUrls: ["./new-event-accommodation.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewEventAccommodationComponent extends NewEventComponent {
  protected readonly form = new AccommodationFormGroup();

  constructor() {
    super();
  }
}
