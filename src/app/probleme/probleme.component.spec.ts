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
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it("#2 | Zone PRÉNOM valide avec 3 caractères", () => {
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it("#3 | Zone PRÉNOM valide avec 200 caractères", () => {
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () => {
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('');
    expect(zone.valid).toBeFalsy();
  });

  it("#5 | Zone PRÉNOM valide avec 10 espaces", () => {
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeTruthy();
  });

  it("#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère", () => {
    let zone = component.prenom.controls['prenomUsager'];
    zone.setValue('  a');
    expect(zone.valid).toBeTruthy();
  });

});
