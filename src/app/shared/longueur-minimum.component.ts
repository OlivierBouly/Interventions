import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ZonesValidator {
    static plage(valeurMinimum: number): ValidatorFn {
        return (c: AbstractControl): { [key: string]: boolean} | null => {
            if(c.value.replaceAll(' ','').length >= valeurMinimum) {
                return null;
            }
            return {'nbreCharsInsuffisants': true};
        };
    }
}