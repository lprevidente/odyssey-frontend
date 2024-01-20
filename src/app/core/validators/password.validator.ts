import { AbstractControl, ValidationErrors } from "@angular/forms";

export const passwordMatchValidator = (
  control: AbstractControl<unknown>
): ValidationErrors | null => {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};
