import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NationalLibraryService } from '../_services/national-library.service';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { BookService } from '../_services/book.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
declare var $ : any;

@Component({
  selector: 'app-books-from-nl',
  templateUrl: './books-from-nl.component.html',
  styleUrls: ['./books-from-nl.component.css']
})
export class BooksFromNLComponent implements OnInit {
  formGroup: FormGroup;
  searchFormGroup: FormGroup;
  searchAuthor: string;
  searchTitle: string;
  searchIsbnIssn: string;
  foundBooks: any[];

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
    private nationalLibraryService: NationalLibraryService,
    private bookService: BookService,
    private toastr: ToastrService,
    private location: Location,
  ) { }

  

  ngOnInit() {
    $("#loading-spinner").hide();
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
      author: new FormControl('', [
      ]),
      title: new FormControl('', [
      ]),
    });
  }

  setItemsValue(index: number): void {
    //this.formGroup.get('bookId').setValue(this.foundBooks[index].bookId);
    this.formGroup.get('isbn').setValue(this.foundBooks[index].isbn);
    this.formGroup.get('author').setValue(this.foundBooks[index].author);
    this.formGroup.get('titleEn').setValue(this.foundBooks[index].titleEn);
    this.formGroup.get('titlePL').setValue(this.foundBooks[index].titlePL);
    this.formGroup.get('description').setValue(this.foundBooks[index].description);
    this.formGroup.get('editionNumber').setValue(this.foundBooks[index].editionNumber);
    this.formGroup.get('editionDate').setValue(this.foundBooks[index].editionDate);
    this.formGroup.get('editionPlace').setValue(this.foundBooks[index].editionPlace);
    this.formGroup.get('genreName').setValue(this.foundBooks[index].genreName);
    this.formGroup.get('publisherName').setValue(this.foundBooks[index].publisherName);
  }

  searchBookInNL(): void {
    this.foundBooks = [];
    $("#not-found").hide();
    $("#loading-spinner").show();
    this.nationalLibraryService.getBooksFromNL(this.searchFormGroup.get('isbnIssn').value, this.searchFormGroup.get('author').value, this.searchFormGroup.get('title').value)
      .subscribe(resp => {
        console.log('Ksiazki wczytane z BN: ' + JSON.stringify(resp.body));
        $("#loading-spinner").hide();
        this.foundBooks = resp.body;
        
        if (this.foundBooks.length == 0) {
          $("#not-found").show();
        }
      }, error => {
        //console.log($("#connection-refused-err").show());
        $("#loading-spinner").hide();
        this.toastr.error('Podczas pobierania danych z Biblioteki Narodowej wystąpił błąd. Spróbuj ponownie.');
        console.log(error);
      });
  }

  onAddBookFromNLClick(index: number) {
    this.formGroup.reset();
    this.setItemsValue(index);
  }

  createBook(): void { 
    this.bookService.createBook(this.formGroup.value)
      .subscribe(resp => {
        $("#createBookFromNLModal").modal('toggle');
        this.toastr.success('Nowa książka została dodana pomyślnie!');
        this.location.back();
      }, error => {
        this.toastr.error('Dodawanie książki nie powiodło się. Spróbuj ponownie.')
        console.log(error);
      });
  }

}
