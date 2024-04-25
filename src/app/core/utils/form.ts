import { FormControlOptions, Validators } from "@angular/forms";

export const nonNullable: FormControlOptions & { nonNullable: true } = {
  nonNullable: true,
};

export const nonNullableRequired: FormControlOptions & {
  nonNullable: true;
} = {
  nonNullable: true,
  validators: [Validators.required],
};
