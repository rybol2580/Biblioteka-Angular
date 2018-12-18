import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";

import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reader-details',
  templateUrl: './reader-details.component.html',
  styleUrls: ['./reader-details.component.css']
})
export class ReaderDetailsComponent implements OnInit {
  reader: Reader;
  formGroup: FormGroup;
  headers: any;
  status: any;

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

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService
  ) { }

  ngOnInit() {
    this.getReader();

    // Definicja form groups
    this.formGroup = new FormGroup({
      readerId: new FormControl('', [
        Validators.required
      ]),
      cardNumber: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      firstName: new FormControl('', [
        Validators.required
      ]),
      lastName: new FormControl('', [
        Validators.required
      ]),
      pesel: new FormControl('', [
        Validators.required
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

  getReader(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    /*this.readerService.getReader(id)
      .subscribe(reader => this.reader = reader);*/
    this.readerService.getReader(id)
      .subscribe(resp => {
        this.reader = resp.body;
        console.log('reader na poczatku: ' + this.reader.readerId);
        this.setItemsValue();
        if (resp.status > 300) {
          console.log('blaad jest');
        } else {
          this.status = resp.status;
        }
      }, error => {
        console.log('test');
        console.log(error);
      });
  }

  setItemsValue(): void {
    this.formGroup.get('readerId').setValue(this.reader.readerId);
    this.formGroup.get('cardNumber').setValue(this.reader.cardNumber);
    this.formGroup.get('firstName').setValue(this.reader.firstName);
    this.formGroup.get('lastName').setValue(this.reader.lastName);
    this.formGroup.get('pesel').setValue(this.reader.pesel);
    this.formGroup.get('birthday').setValue(this.reader.birthday);
    this.formGroup.get('phone').setValue(this.reader.phone);
    this.formGroup.get('email').setValue(this.reader.email);
    this.formGroup.get('city').setValue(this.reader.city);
    this.formGroup.get('street').setValue(this.reader.street);
    this.formGroup.get('streetNumber').setValue(this.reader.streetNumber);
    this.formGroup.get('flatNumber').setValue(this.reader.flatNumber);
  }

  /*assignItemsToReader(): Reader {
    this.reader. = this.formGroup.get('cardNumber');
    this.reader. = this.formGroup.get('firstName');
    this.reader. = this.formGroup.get('lastName');
    this.reader. = this.formGroup.get('pesel');
    this.reader. = this.formGroup.get('birthday');
    this.reader. = this.formGroup.get('phone');
    this.reader. = this.formGroup.get('email');
    this.reader. = this.formGroup.get('city');
    this.reader. = this.formGroup.get('street');
    this.reader. = this.formGroup.get('streetNumber');
    this.reader. = this.formGroup.get('flatNumber');
  }*/

  save(reader: Reader): void {
    console.log(`${reader.lastName}`);
    this.readerService.updateReader(reader)
      .subscribe();
  }

  readerUpdate(): void {
    //console.log(this.formGroup.value);
    this.reader = this.formGroup.value;
    this.readerService.updateReader(this.reader)
      .subscribe();
  }

}
