import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
//import * as $ from 'jquery';
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';
import { ReadersReportComponent } from '../readers-report/readers-report.component';

@Component({
  selector: 'app-add-reader-modal',
  templateUrl: './add-reader-modal.component.html',
  styleUrls: ['./add-reader-modal.component.css']
})
export class AddReaderModalComponent implements OnInit {
  formGroup: FormGroup;
  headers: any;
  status: any;

  readersReport: ReadersReportComponent;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Pole ${label.toUpperCase()} jest wymagane!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label.toUpperCase()} DOESN'T LOOK RIGHT...`
    }, {
      error: 'minlength',
      format: (label, error) => `${label.toUpperCase()} za krótkie!`
    }, {
      error: 'maxlength',
      format: (label, error) => `${label.toUpperCase()} za dlugie!`
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private readerService: ReaderService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    // Definicja form groups
    this.formGroup = new FormGroup({
      cardNumber: new FormControl('', [
        //Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl('', [
        //Validators.required,
        //Validators.minLength(3)
      ]),
      firstName: new FormControl('', [
        //Validators.required,
        //Validators.minLength(4)
      ]),
      lastName: new FormControl('', [
        //Validators.required,
        //Validators.maxLength(10)
      ]),
      pesel: new FormControl('', [
        //Validators.required
      ]),
      birthday: new FormControl('', [
        //Validators.required
      ]),
      phone: new FormControl('', [
        //Validators.required
      ]),
      email: new FormControl('', [
        //Validators.required
      ]),
      city: new FormControl('', [
        //Validators.required
      ]),
      street: new FormControl('', [
        //Validators.required
      ]),
      streetNumber: new FormControl('', [
        //Validators.required
      ]),
      flatNumber: new FormControl('', [
        //Validators.required
      ]),
      // first: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(8),
      //   Validators.maxLength(20)
      // ])
    });
  }

  createReader(): void {
    this.readerService.createReader(this.formGroup.value)
      .subscribe(resp => {
        $("#createReaderModal").modal('toggle');
        this.toastr.success('Nowy czytelnik został dodany pomyślnie!');
        
      }, error => {
        console.log(error);
        console.log('blad aktualizacji danych');
        //console.log(error);
      });
  }

  cancelClick(): void {
    console.log('zamknij kliknieto');
  }
}
