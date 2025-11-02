import {FormControl, ValidationErrors } from "@angular/forms";

export function trimmedRequiredValidator(control: FormControl<string>): ValidationErrors | null {
  return !control.value || (control.value && control.value.trim() == '') ? {required: true} : null;
}
