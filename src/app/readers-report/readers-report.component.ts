import { Component, OnInit } from '@angular/core';
import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';
import { ReportService } from '../report.service';
import * as $ from 'jquery';
import { Router, Route } from '@angular/router';

// dodane
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-readers-report',
  templateUrl: './readers-report.component.html',
  styleUrls: ['./readers-report.component.css']
})
export class ReadersReportComponent implements OnInit {
  readers: Reader[];
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
      error: 'minlength',
      format: (label, error) => `${label.toUpperCase()} za krótkie!`
    }, {
      error: 'maxlength',
      format: (label, error) => `${label.toUpperCase()} za dlugie!`
    }
  ];

  constructor(
    private readerService: ReaderService,
    private reportService: ReportService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    $("#connection-refused-err").show();
    console.log('READERS REPORT');
    this.getReaders();

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

  // getReaders(): void {
  //   this.readerService.getReaders()
  //     .subscribe(readers => this.readers = readers);
  // }

  getReaders(): void {
    this.readerService.getReaders()
      .subscribe(resp => {
        //$("#connection-refused-err").hide();
        this.readers = resp.body;
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }

  createReader(): void {
    console.log('createReader test');
    this.readerService.createReader(this.formGroup.value)
      .subscribe(resp => {
        $("#createReaderModal").modal('toggle');
        this.toastr.success('Nowy czytelnik został dodany pomyślnie!');
        //this.readers.push(this.formGroup.value);
        this.ngOnInit();
      }, error => {
        console.log(error);
        console.log('blad aktualizacji danych');
        //console.log(error);
      });
  }

  test(): void {
    // this.readerService.downloadReport()
    //   .subscribe(resp => {
    //     //$("#connection-refused-err").hide();
    //     console.log('pobieranie - sukces');
    //     console.log(resp);
    //   }, error => {
    //     //console.log($("#connection-refused-err").show());
    //     console.log('pobieranie - blad');
    //     console.log(error);
    //     console.log(error.body);
    //   });
  }

  public showPDF(): void {
    this.reportService.getPDF()
        .subscribe((data) => {
          var blob = new Blob([data], {type: 'application/pdf'});
        
          var downloadURL = window.URL.createObjectURL(data);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = "help.pdf";
          link.click();
        });
}
}
