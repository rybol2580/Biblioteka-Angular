import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import * as $ from 'jquery';
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';

import { Book } from '../_models/book';
import { BookService } from '../_services/book.service';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { BookCopy } from '../_models/bookcopy';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  formGroup: FormGroup;
  bookCopiesAmount: number;

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
    private bookService: BookService,
    private toastr: ToastrService,
    private location: Location,
  ) { }

  ngOnInit() {
    this.getBook();

    $(document).ready(function() {
      var navLink = $('.nav-link')[0];
      $('.nav-link').each(function(this) {
        $(this).removeClass('active');
      });
      $(navLink).addClass('active');
    });

    // Definicja form groups
    this.formGroup = new FormGroup({
      bookId: new FormControl('', [
        Validators.required
      ]),
      isbn: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13),
        Validators.pattern('[0-9]*')
      ]),
      author: new FormControl('', [
        Validators.required,
      ]),
      titleEn: new FormControl('', [
      ]),
      titlePL: new FormControl('', [
        Validators.required
      ]),
      description: new FormControl('', [
      ]),
      editionNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]*')
      ]),
      editionDate: new FormControl('', [
        Validators.required
      ]),
      editionPlace: new FormControl('', [
        Validators.required
      ]),
      genreName: new FormControl('', [
        Validators.required
      ]),
      publisherName: new FormControl('', [
        Validators.required
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
        console.log('wczytana ksiazka: ' + JSON.stringify(resp.body));
        this.book = resp.body;
        this.setItemsValue();
      }, error => {
        console.log(error);
      });
  }

  updateBook(): void {
    //this.reader = this.formGroup.value;
    //console.log(this.formGroup.value);
    this.bookService.updateBook(this.formGroup.value)
      .subscribe(resp => {
        $("#editBookModal").modal('toggle');
        this.toastr.success('Zmiany zostały zapisane pomyślnie!');
        this.book = this.formGroup.value;
        console.log('zapisane zmiany ksiazki: ' + this.formGroup.value);
        console.log(this.formGroup.value);
        console.log('zapisane zmiany ksiazki -> ksiazka: ' + this.book);
        console.log(this.book);
      }, error => {
        this.toastr.error('Zapisanie zmian nie powiodło się. Spróbuj ponownie.');
        console.log(error);
      });
  }

  onDeleteClick(id: number): void {
    this.bookService.deleteBook(id)
    .subscribe(resp => {
      this.location.back();
      this.toastr.success('Książka została usunięta pomyślnie!');
    }, error => {
      this.toastr.error('Usuwanie książki nie powiodło się. Spróbuj ponownie.');
    });
  }

  onEditModalClick(): void {
    this.setItemsValue();
  }

  public getBookCopiesAmount(bookCopiesAmount: number) {
    this.bookCopiesAmount = bookCopiesAmount;
  }
}
