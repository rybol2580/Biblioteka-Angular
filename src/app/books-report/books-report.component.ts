import { Component, OnInit } from '@angular/core';
import { Book } from '../_models/book';
import { BookService } from '../_services/book.service';
import { ReportService } from '../_services/report.service';
import * as $ from 'jquery';

// dodane
declare var $ : any;
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ErrorMessage} from "ng-bootstrap-form-validation";
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NationalLibraryService } from '../_services/national-library.service';

@Component({
  selector: 'app-books-report',
  templateUrl: './books-report.component.html',
  styleUrls: ['./books-report.component.css']
})
export class BooksReportComponent implements OnInit {
  books: Book[];
  formGroup: FormGroup;
  searchFormGroup: FormGroup;
  searchAuthor: string;
  searchTitle: string;
  searchIsbnIssn: string;
  foundBooks: any[];
  
  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Zawartość pola "${label}" nie może być pusta!`
    }, {
      error: 'pattern',
      format: (label, error) => `Zawartość pola ${label} musi być liczbą!`
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
    private nationalLibrary: NationalLibraryService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.getBooks();
    $(document).ready(function() {
      var navLink = $('.nav-link')[0];
      $('.nav-link').each(function(this) {
        $(this).removeClass('active');
      });
      $(navLink).addClass('active');
    });

    this.formGroup = new FormGroup({
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
        Validators.required,
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

    this.searchFormGroup = new FormGroup({
      isbnIssn: new FormControl('', [
      ]),
      title: new FormControl('', [
      ]),
      author: new FormControl('', [
      ]),
    });
  }

  getBooks(): void {
    this.bookService.getBooks()
      .subscribe(resp => {
        this.books = resp.body;
      }, error => {
        //console.log($("#connection-refused-err").show());
        this.toastr.error("Nie udało się załadować listy książek. Spróbuj ponownie.");
        $("#loading-spinner").hide();
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

  onAddClick(): void {
    this.formGroup.reset();
  }

  onCreateFromNLClick(): void {
    this.searchFormGroup.reset();
    $("#formBody").hide();
  }
}
