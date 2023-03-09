import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit{

  prenom: FormGroup;
  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.prenom = this.fb.group({
      prenomUsager: ['', [Validators.minLength(3), Validators.maxLength(200), Validators.required]]
    });
  }

  save(): void {
  }

}
