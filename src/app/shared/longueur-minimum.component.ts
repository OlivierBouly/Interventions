import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static plage(): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean} | null => {
            if(c.value.replace(' ','').length >= 3) {
                return null;
            }
            return {'plageInvalide': true};
        };
    }
}