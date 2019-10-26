import { ValidatorFn, AbstractControl } from '@angular/forms';

export function LessOrEqualsTo(value: number): ValidatorFn {

    return (control: AbstractControl): { [key: string]: any } | null => {
        const forbidden = control.value <= value;
        return forbidden ? { 'invalidValue': { value: control.value } } : null;
    };
}