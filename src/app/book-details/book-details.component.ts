import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as $ from 'jquery';
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';

import { Book } from '../entities/book';
import { BookService } from '../book.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  bookCopies: any;
  formGroup: FormGroup;

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
    private bookService: BookService,
    private toastr: ToastrService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getBook();

    // Definicja form groups
    this.formGroup = new FormGroup({
      bookId: new FormControl('', [
        Validators.required
      ]),
      isbn: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      author: new FormControl('', [
        Validators.required,
        //Validators.minLength(4)
      ]),
      titleEn: new FormControl('', [
        Validators.required,
        //Validators.maxLength(10)
      ]),
      titlePL: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
        //Validators.required
      ]),
      editionNumber: new FormControl('', [
        //Validators.required
      ]),
      editionDate: new FormControl('', [
        //Validators.required
      ]),
      editionPlace: new FormControl('', [
        //Validators.required
      ]),
      genreName: new FormControl('', [
        //Validators.required
      ]),
      publisherName: new FormControl('', [
        //Validators.required
      ]),
    });
  }

  setItemsValue(): void {
    this.formGroup.get('bookId').setValue(this.book.bookId);
    this.formGroup.get('isbn').setValue(this.book.isbn);
    this.formGroup.get('author').setValue(this.book.author);
    this.formGroup.get('titleEn').setValue(this.book.titleEn);
    this.formGroup.get('titlePL').setValue(this.book.titlePL);
    this.formGroup.get('description').setValue(this.book.description);
    this.formGroup.get('editionNumber').setValue(this.book.editionNumber);
    this.formGroup.get('editionDate').setValue(this.book.editionDate);
    this.formGroup.get('editionPlace').setValue(this.book.editionPlace);
    this.formGroup.get('genreName').setValue(this.book.genreName);
    this.formGroup.get('publisherName').setValue(this.book.publisherName);
  }

  getBook(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    
    this.bookService.getBook(id)
      .subscribe(resp => {
        this.book = resp.body;
        this.setItemsValue();
      }, error => {
        console.log(error);
      });
  }

  bookUpdate(): void {
    //this.reader = this.formGroup.value;
    //console.log(this.formGroup.value);
    this.bookService.updateBook(this.formGroup.value)
      .subscribe(resp => {
        $("#editBookModal").modal('toggle');
        this.toastr.success('Zmiany zostały zapisane pomyślnie!');
        this.book = this.formGroup.value;
      }, error => {
        this.toastr.error('Zapisanie zmian nie powiodło się. Spróbuj ponownie.');
      });
  }

  deleteBook(): void {
    this.bookService.deleteBook(this.book)
      .subscribe(resp => {
        this.location.back();
        this.toastr.success('Książka została usunięta pomyślnie!');
      }, error => {
        this.toastr.error('Usuwanie książki nie powiodło się. Spróbuj ponownie.');
      });
  }

}
