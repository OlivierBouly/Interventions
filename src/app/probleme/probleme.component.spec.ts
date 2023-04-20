import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';
import { emailMatcherValidator } from '../shared/email-matcher.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers:[ProblemeService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("#1 | Zone PRÉNOM invalide avec 2 caractères", () => {
    let errors = {};
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#2 | Zone PRÉNOM valide avec 3 caractères", () => {
    let errors = {};
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

  it("#3 | Zone PRÉNOM valide avec 200 caractères", () => {
    let errors = {};
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () => {
    let errors = {};
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('');
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#5 | Zone PRÉNOM valide avec 10 espaces", () => {
    let errors = {};
    let zone = component.problemForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère", () => {
    let errors = {};
    let zone = component.problemForm.controls['prenom'];
    zone.setValue('  a');
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('pasNotifier');

    let zone = component.problemForm.get('telephone')
    expect(zone.status).toEqual('DISABLED')
  })

  it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
    component.appliquerNotifications('pasNotifier');

    let zone = component.problemForm.get('telephone')
    expect(zone.value).toEqual(null)
  })

  it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('pasNotifier');

    let zone = component.problemForm.get('courrielGroup.courriel')
    expect(zone.status).toEqual('DISABLED')
  })

  it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('pasNotifier');

    let zone = component.problemForm.get('courrielGroup.courrielConfirmation')
    expect(zone.status).toEqual('DISABLED')
  })

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  })

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');
    expect(zone.status).toBeTruthy(); 
  })

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toBeTruthy(); 
  })

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');
    zone.setValue(null);
    expect(zone.value).toBeFalsy(); 
  })

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courrielConfirmation');
    zone.setValue(null);
    expect(zone.value).toBeFalsy(); 
  })

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');

    zone.setValue("abaaga");

    expect(zone.valid).toBeFalse();
  })

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide est invalide', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');
    let zone01 = component.problemForm.get('courrielGroup.courrielConfirmation');
    let group = component.problemForm.get("courrielGroup")

    zone.setValue(null);
    zone01.setValue("abc@default.com");

    expect(group.valid).toBeFalse();
  })

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur est invalide', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');
    let zone01 = component.problemForm.get('courrielGroup.courrielConfirmation');
    let group = component.problemForm.get("courrielGroup")

    zone.setValue("abc@default.com");
    zone01.setValue(null);

    expect(group.valid).toBeFalse();
  })

  it('#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');
    let zone01 = component.problemForm.get('courrielGroup.courrielConfirmation');
    let group = component.problemForm.get("courrielGroup")

    zone.setValue("abc@default.com");
    zone01.setValue("abc@default");

    expect(group.valid).toBeFalse();
  })

  it('#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.appliquerNotifications('notifierCourriel');

    let zone = component.problemForm.get('courrielGroup.courriel');
    let zone01 = component.problemForm.get('courrielGroup.courrielConfirmation');
    let group = component.problemForm.get("courrielGroup")

    zone.setValue("abc@default.com");
    zone01.setValue("abc@default.com");

    expect(group.valid).toBeTrue();
  })

  it('#29 | Zone TELEPHONE est activée quand notifier par telephone', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('telephone');
    expect(zone.status).toBeTruthy(); 
  })

  it('#30 | Zone ADRESSE COURRIEL est desactivée quand notifier par telephone', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('courrielGroup.courriel')
    expect(zone.status).toEqual('DISABLED')
  })

  it('#31 | Zone CONFIRMER COURRIEL est desactivée quand notifier par telephone', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('courrielGroup.courrielConfirmation')
    expect(zone.status).toEqual('DISABLED')
  })

  it('#32 | Zone TELEPHONE est invalide sans valeur quand notifier par telephone', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue(null);
    expect(zone.valid).toBeFalse(); 
  })

  it('#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("abc");
    expect(zone.valid).toBeFalse(); 
  })

  it('#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("111111111");
    expect(zone.valid).toBeFalse(); 
  })

  it('#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("11111111111");
    expect(zone.valid).toBeFalse(); 
  })

  it('#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte', () => {
    component.appliquerNotifications('notifierTelephone');

    let zone = component.problemForm.get('telephone');
    zone.setValue("1234567891");
    expect(zone.valid).toBeTrue(); 
  })
});
