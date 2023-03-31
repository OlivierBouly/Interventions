import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';
import { ProblemeService } from './probleme.service';

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
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemForm.get('telephone')
    expect(zone.status).toEqual('DISABLED')
  })

  it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemForm.get('telephone')
    expect(zone.value).toEqual(null)
  })

  it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemForm.get('courrielGroup.courriel')
    expect(zone.status).toEqual('DISABLED')
  })

  it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () =>{
    component.appliquerNotifications('Ne pas me notifier');

    let zone = component.problemForm.get('courrielGroup.courrielConfirmation')
    expect(zone.status).toEqual('DISABLED')
  })
});
