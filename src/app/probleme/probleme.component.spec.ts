import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
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
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('a'.repeat(2));
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#2 | Zone PRÉNOM valide avec 3 caractères", () => {
    let errors = {};
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('a'.repeat(3));
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

  it("#3 | Zone PRÉNOM valide avec 200 caractères", () => {
    let errors = {};
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('a'.repeat(200));
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () => {
    let errors = {};
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('');
    errors = zone.errors || {};
    expect(zone.valid).toBeFalsy();
  });

  it("#5 | Zone PRÉNOM valide avec 10 espaces", () => {
    let errors = {};
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue(' '.repeat(10));
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

  it("#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère", () => {
    let errors = {};
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('  a');
    errors = zone.errors || {};
    expect(zone.valid).toBeTruthy();
  });

});
