import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum.component';
import { ProblemeService } from './probleme.service';
import { ITypeProbleme } from './typeproblem';
import { emailMatcherValidator } from '../shared/email-matcher.component';

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
          courriel: [{value: '', disabled: true}, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
          courrielConfirmation: [{value: '', disabled: true}, [Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]]
        }),
      telephone: [{value: '', disabled: true}, [Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]]
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

    if (notification === 'notifierCourriel') {   
            courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
            courrielControl.enable();  
            courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
            courrielConfirmationControl.enable();
            courrielGroupControl.setValidators([Validators.compose([emailMatcherValidator.courrielDifferents()])])
            telephoneControl.disable();
            telephoneControl.clearValidators();         
      }   
      else
      {
        if (notification === 'notifierTelephone') {        
          courrielControl.disable();
          courrielControl.clearValidators();        
          courrielConfirmationControl.disable();
          courrielConfirmationControl.clearValidators();
          telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10)]);
          telephoneControl.enable();                  
    }   
    else{
      if(notification === 'pasNotifier')
      {
        courrielControl.clearValidators;      
        courrielControl.disable();   
        courrielConfirmationControl.clearValidators;
        courrielConfirmationControl.disable();
        telephoneControl.clearValidators();
        telephoneControl.disable();
      }
    }
  }
    courrielControl.updateValueAndValidity();   
    courrielConfirmationControl.updateValueAndValidity();
    courrielGroupControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();         
  }

}
