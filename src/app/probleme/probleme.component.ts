import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ZonesValidator } from '../shared/longueur-minimum.component';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{

  problemForm: FormGroup;
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.problemForm = this.fb.group({
      prenom: ['', [ZonesValidator.minLength(3), Validators.maxLength(200), Validators.required]]
    });
  }

  save(): void {
  }

}
