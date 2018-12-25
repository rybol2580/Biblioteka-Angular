import { Component, OnInit } from '@angular/core';
import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';
import { ReportService } from '../report.service';
import * as $ from 'jquery';

// dodane
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';

//declare var $: any;

@Component({
  selector: 'app-readers-report',
  templateUrl: './readers-report.component.html',
  styleUrls: ['./readers-report.component.css']
})
export class ReadersReportComponent implements OnInit {
  readers: Reader[];
  formGroup: FormGroup;
  
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Pole "${label}" nie może być puste!`
    }, {
      error: 'pattern',
      format: (label, error) => `${label} DOESN'T LOOK RIGHT...`
    }, {
      error: 'minlength',
      format: (label, error) => `${label} za krótkie!`
    }, {
      error: 'maxlength',
      format: (label, error) => `${label} za dlugie!`
    }
  ];

  constructor(
    private readerService: ReaderService,
    private reportService: ReportService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getReaders();

    this.formGroup = new FormGroup({
      cardNumber: new FormControl('', [
        //Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        //Validators.minLength(4)
      ]),
      lastName: new FormControl('', [
        Validators.required,
        //Validators.maxLength(10)
      ]),
      pesel: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11)
      ]),
      birthday: new FormControl('', [
        //Validators.required
      ]),
      phone: new FormControl('', [
        //Validators.required
      ]),
      email: new FormControl('', [
        Validators.required
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
    this.readerService.createReader(this.formGroup.value)
      .subscribe(resp => {
        $("#createReaderModal").modal('toggle');
        this.toastr.success('Nowy czytelnik został dodany pomyślnie!');
        //this.readers.push(this.formGroup.value);
        //this.ngOnInit();
        this.getReaders();
      }, error => {
        console.log(error);
        console.log('blad aktualizacji danych');
        //console.log(error);
      });
  }

  public showPDF(): void {
    this.reportService.getPDF()
        .subscribe(resp => {
          //var blob = new Blob([resp.body], {type: 'application/pdf'});
        
          // var downloadURL = window.URL.createObjectURL(resp.body);
          // var link = document.createElement('a');
          // link.href = downloadURL;
          // link.download = "help.pdf";
          // link.click();
          this.toastr.success('Raport został pobrany pomyślnie!');
        }, error => {
          this.toastr.success('Nie udało się pobrać raportu. Spróbuj ponownie.');
        });
}
}
