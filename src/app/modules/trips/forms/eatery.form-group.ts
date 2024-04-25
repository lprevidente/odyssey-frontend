import { ActivityFormGroup } from "@modules/trips/forms/activity.form-group";
import { Place } from "@modules/trips/models/address";
import { FormControl } from "@angular/forms";
import { nonNullableRequired } from "@core/utils/form";

export class EateryFormGroup extends ActivityFormGroup {
  constructor() {
    super({
      place: new FormControl<Place>({} as Place, nonNullableRequired),
      reservation: new FormControl<boolean>(false, nonNullableRequired),
      time: new FormControl<Date | null>(null),
    });
  }
}
