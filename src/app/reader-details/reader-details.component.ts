import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as $ from 'jquery';
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';

import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';

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
      format: (label, error) => `Zawartość pola "${label}" nie może być pusta!`
    }, {
      error: 'pattern',
      format: (label, error) => `Zawartość pola ${label} musi być liczbą`
    }, {
      error: 'minlength',
      format: (label, error) => `Zawartość pola "${label}" nie może być taka krótka!`
    }, {
      error: 'maxlength',
      format: (label, error) => `Zawartość pola "${label}" nie może być taka długa!`
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService,
    private toastr: ToastrService,
    private location: Location
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
      ]),
      firstName: new FormControl('', [
        Validators.required,
      ]),
      lastName: new FormControl('', [
        Validators.required,
      ]),
      pesel: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
      ]),
      birthday: new FormControl('', [
      ]),
      phone: new FormControl('', [
      ]),
      email: new FormControl('', [
        Validators.required
      ]),
      city: new FormControl('', [
      ]),
      street: new FormControl('', [
      ]),
      streetNumber: new FormControl('', [
      ]),
      flatNumber: new FormControl('', [
      ]),
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

  updateReader(): void {
    //this.reader = this.formGroup.value;
    //console.log(this.formGroup.value);
    this.readerService.updateReader(this.formGroup.value)
      .subscribe(resp => {
        $("#editReaderModal").modal('toggle');
        this.toastr.success('Zmiany zostały zapisane pomyślnie!');
        this.reader = this.formGroup.value;
      }, error => {
        console.log('blad aktualizacji danych');
        //console.log(error);
      });
  }


  onDeleteClick(id: number): void {
    this.readerService.deleteReader(this.reader)
    .subscribe(resp => {
      this.location.back();
      this.toastr.success('Czytelnik został usunięty pomyślnie!');
    }, error => {
      this.toastr.error('Usuwanie czytelnika nie powiodło się. Spróbuj ponownie.');
      //console.log(error);
    });
  }

  onEditClick(): void {
    this.setItemsValue();
  }

}
