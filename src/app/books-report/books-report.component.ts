import { Component, OnInit } from '@angular/core';
import { Book } from '../entities/book';
import { BookService } from '../book.service';
import { ReportService } from '../report.service';
import * as $ from 'jquery';

// dodane
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-books-report',
  templateUrl: './books-report.component.html',
  styleUrls: ['./books-report.component.css']
})
export class BooksReportComponent implements OnInit {
  books: Book[];
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
      format: (label, error) => `Zawartość pola "${label}" nie może być taka krótka!`
    }, {
      error: 'maxlength',
      format: (label, error) => `Zawartość pola "${label}" nie może być taka długa!`
    }
  ];

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getBooks();

    this.formGroup = new FormGroup({
      isbn: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      author: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      titleEn: new FormControl('', [
        //Validators.required,
        //Validators.minLength(5)
      ]),
      titlePL: new FormControl('', [
        //Validators.required,
        //Validators.minLength(4)
      ]),
      description: new FormControl('', [
        Validators.required,
        //Validators.maxLength(10)
      ]),
      editionNumber: new FormControl('', [
        Validators.required,
        //Validators.minLength(11),
        //Validators.maxLength(11)
      ]),
      editionDate: new FormControl('', [
        //Validators.required
      ]),
      editionPlace: new FormControl('', [
        //Validators.required
      ]),
      genreName: new FormControl('', [
        Validators.required
      ]),
      publisherName: new FormControl('', [
        //Validators.required
      ]),
    });
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(resp => {
        //console.log('Ksiazki wczytane z bazy: ' + JSON.stringify(resp.body));
        this.books = resp.body;
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }

  createBook(): void { 
    this.bookService.createBook(this.formGroup.value)
      .subscribe(resp => {
        $("#createBookModal").modal('toggle');
        this.toastr.success('Nowa książka została dodana pomyślnie!');
        //this.ngOnInit();
        this.getBooks();
      }, error => {
        this.toastr.error('Dodawanie książki nie powiodło się. Spróbuj ponownie.')
      });
  }

//   public showPDF(): void {
//     this.reportService.getPDF()
//         .subscribe(resp => {
//           //var blob = new Blob([resp.body], {type: 'application/pdf'});
        
//           // var downloadURL = window.URL.createObjectURL(resp.body);
//           // var link = document.createElement('a');
//           // link.href = downloadURL;
//           // link.download = "help.pdf";
//           // link.click();
//           this.toastr.success('Raport został pobrany pomyślnie!');
//         }, error => {
//           this.toastr.success('Nie udało się pobrać raportu. Spróbuj ponownie.');
//         });
// }

}
