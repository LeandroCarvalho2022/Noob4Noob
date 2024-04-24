import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordValidatorDirective,
      multi: true,
    },
  ],
  inputs: ['controlName: appPasswordValidator']
})
export class PasswordValidatorDirective implements Validator {
  @Input('appPasswordValidator') controlName!: string;
  @Input() matchingControlName!: string;

  constructor() {}

  validate(control: AbstractControl): ValidationErrors | null {
    const controlToValidate = control.root.get(this.controlName);
    const matchingControl = control.root.get(this.matchingControlName);

    if (!controlToValidate || !matchingControl) {
      return null;
    }

    if (controlToValidate.value !== matchingControl.value) {
      return { matching: true };
    } else {
      if (matchingControl.errors && matchingControl.errors['matching']) {
        delete matchingControl.errors['matching'];
        if (Object.keys(matchingControl.errors).length === 0) {
          matchingControl.setErrors(null);
        }
      }
      return null;
    }
  }
}
