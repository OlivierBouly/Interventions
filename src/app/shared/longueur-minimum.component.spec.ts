import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('Zones Validator', () => {
    it('Valeur valide asd pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.plage();
        let control = {value: "asd"};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });
    it('Valeur invalide " a " pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.plage();
        let control = {value: " a "};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });
});