import { ActivityFormGroup } from "@modules/trips/forms/activity.form-group";
import { Place } from "@modules/trips/models/address";
import { FormControl } from "@angular/forms";
import { nonNullableRequired } from "@core/utils/form";
import {
  ActivityType,
  TransportationType,
} from "@modules/trips/models/activity";

export class TransportationFormGroup extends ActivityFormGroup {
  constructor() {
    super({
      type: new FormControl<ActivityType>(
        "transportation",
        nonNullableRequired
      ),
      means: new FormControl<TransportationType>("bus", nonNullableRequired),
      from: new FormControl<Place>({} as Place, nonNullableRequired),
      to: new FormControl<Place>({} as Place, nonNullableRequired),
      departureTime: new FormControl<string | null>(null),
      arrivalTime: new FormControl<string | null>(null),
      number: new FormControl<string>("", nonNullableRequired),
    });
  }
}
