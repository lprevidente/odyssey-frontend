import { ActivityFormGroup } from "@modules/trips/forms/activity.form-group";
import { Place } from "@modules/trips/models/address";
import { FormControl } from "@angular/forms";
import { nonNullableRequired } from "@core/utils/form";
import { ActivityType } from "@modules/trips/models/activity";

export class AccommodationFormGroup extends ActivityFormGroup {
  constructor() {
    super({
      type: new FormControl<ActivityType>("accommodation", nonNullableRequired),
      place: new FormControl<Place>({} as Place, nonNullableRequired),
      checkIn: new FormControl<Date | null>(null),
      checkOut: new FormControl<Date | null>(null),
    });
  }
}
