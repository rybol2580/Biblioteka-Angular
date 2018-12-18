import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";

@Component({
  selector: 'app-test-walidacji',
  templateUrl: './test-walidacji.component.html',
  styleUrls: ['./test-walidacji.component.css']
})
export class TestWalidacjiComponent implements OnInit {
  formGroup: FormGroup;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Pole ${label.toUpperCase()} jest wymagane!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} DOESN'T LOOK RIGHT...`
    }, {
      error: 'MinLengthValidator',
      format: (label, error) => `${label.toUpperCase()} za krótkie!`
    }
  ];

  constructor() { }

  ngOnInit() {
    this.formGroup = new FormGroup({
      Email: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      Password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20)
      ])
    });
  }

  onSubmit() {
    console.log(this.formGroup);
  }
 
  onReset() {
    this.formGroup.reset();
  }

}
