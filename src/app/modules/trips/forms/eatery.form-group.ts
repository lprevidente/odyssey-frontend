import { ActivityFormGroup } from "@modules/trips/forms/activity.form-group";
import { Place } from "@modules/trips/models/address";
import { FormControl } from "@angular/forms";
import { nonNullableRequired } from "@core/utils/form";
import { ActivityType } from "@modules/trips/models/activity";

export class EateryFormGroup extends ActivityFormGroup {
  constructor() {
    super({
      type: new FormControl<ActivityType>("eatery", nonNullableRequired),
      place: new FormControl<Place>({} as Place, nonNullableRequired),
      reservation: new FormControl<boolean>(false, nonNullableRequired),
      time: new FormControl<Date | null>(null),
    });
  }
}
