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
    private readerService: ReaderService,
    private reportService: ReportService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getReaders();

    this.formGroup = new FormGroup({
      cardNumber: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
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

  getReaders(): void {
    this.readerService.getReaders()
      .subscribe(resp => {
        //$("#connection-refused-err").hide();
        this.readers = resp.body;
      }, error => {
        $("#loadingSpinner").hide();
        console.log(error);
      });
  }

  createReader(): void {
    this.readerService.createReader(this.formGroup.value)
      .subscribe(resp => {
        $("#createReaderModal").modal('toggle');
        console.log(this.formGroup.value);
        this.toastr.success('Nowy czytelnik został dodany pomyślnie!');
        this.getReaders();
      }, error => {
        this.toastr.error('Nie udało się dodać czytelnika. Spróbuj ponownie.');
      });
  }

  showPDF(): void {
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
          this.toastr.error('Nie udało się pobrać raportu. Spróbuj ponownie.');
        });
  }

  onAddClick(): void {
    this.formGroup.reset();
  }
}
