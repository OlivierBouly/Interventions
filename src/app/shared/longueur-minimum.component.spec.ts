import { AbstractControl } from "@angular/forms";
import { ZonesValidator } from "./longueur-minimum.component";

describe('Zones Validator', () => {
    it('Valeur valide asd pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "asd"};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('Valeur invalide " a " pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: " a "};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });

    it('Valeur invalide 10 espaces pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "          "};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });

    it('Valeur invalide "" pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: ""};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });

    it('Valeur valide " a f 3 2 g   " pour la plage avec 3 characteres ou plus', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: " a f 3 2 g   "};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });
    // debut test demander dans ennoncer

    it('7# une chaine avec 10 espaces est invalide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "          "};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });
    
    it('8# une phrase avec des mots est valide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "Vive angular"};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('9# une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "   je le veux   "};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('10# une phrase avec 1 espace et 2 caracteres est invalide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: " xx"};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });

    it('11# une phrase avec 2 espace et 1 caracteres est invalide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "  x"};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });

    it('12# une phrase avec 3 espaces et 3 characteres est valide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "   xxx"};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('13# une phrase avec 5 espaces et 5 characteres et 5 espaces est valide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: "     xxxxx     "};
        let result = validator(control as AbstractControl);
        expect(result).toBeNull();
    });

    it('14# une chaine nulle est invalide', () =>{
        let validator = ZonesValidator.minLength(3);
        let control = {value: null};
        let result = validator(control as AbstractControl);
        expect(result['nbreCharsInsuffisants']).toBe(true);
    });

});