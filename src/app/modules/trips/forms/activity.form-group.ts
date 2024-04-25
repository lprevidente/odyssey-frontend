import { FormControl, UntypedFormGroup } from "@angular/forms";
import { nonNullableRequired } from "@core/utils/form";

export abstract class ActivityFormGroup extends UntypedFormGroup {
  protected constructor(controls: Record<string, FormControl<unknown>>) {
    super({
      name: new FormControl<string>("", nonNullableRequired),
      notes: new FormControl<string | null>(null),
      link: new FormControl<string | null>(null),
      expense: new FormControl<number | null>(null),
      ...controls,
    });
  }
}
