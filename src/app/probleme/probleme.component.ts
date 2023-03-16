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
      nom: ['', [ZonesValidator.minLength(3), Validators.maxLength(50), Validators.required]],
      typeProbleme: ['', Validators.required]
    });

    this.typeproblemeService.obtenirTypesProbleme()
    .subscribe(typesProbleme => this.typesProbleme = typesProbleme,
               error => this.errorMessage = <any>error);  


  }

  save(): void {
  }

}
