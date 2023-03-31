import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum.component';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './typeproblem';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{

  problemForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(private fb: FormBuilder, private typeproblemeService: ProblemeService) { }
  
  ngOnInit() {
    this.problemForm = this.fb.group({
      prenom: ['', [ZonesValidator.minLength(3), Validators.maxLength(200), Validators.required]],
      nom: ['', [ZonesValidator.minLength(3), Validators.maxLength(200), Validators.required]],
      typeProbleme: ['', Validators.required], 
      courrielGroup: this.fb.group({
          courriel: [{value: '', disabled: true}],
          courrielConfirmation: [{value: '', disabled: true}]
        }),
      telephone: [{value: '', disabled: true}]
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  


  }

  save(): void {
  }
  appliquerNotifications(notification: string): void {
    const courrielControl = this.problemForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemForm.get('courrielGroup');
    const telephoneControl = this.problemForm.get('telephone');

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

    if (notification === 'Me notifier') {   
            courrielControl.setValidators([Validators.required]);      
            courrielControl.enable();  
            courrielConfirmationControl.setValidators([Validators.required]);              
            courrielConfirmationControl.enable();  
            telephoneControl.setValidators([Validators.required]);
            telephoneControl.enable()                   
      }   
      else
      {
        if(notification === 'Ne pas me notifier')
        {
          courrielControl.clearValidators;      
          courrielControl.disable();   
          courrielConfirmationControl.clearValidators;
          courrielConfirmationControl.disable();
          telephoneControl.clearValidators();
          telephoneControl.disable();
        }
      }
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();         
  }

}
