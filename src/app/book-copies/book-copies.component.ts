import { Component, OnInit, Input } from '@angular/core';
import { BookCopy } from '../entities/bookcopy';
import { BookCopyService } from '../book-copy.service';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $ : any;
import { ToastrService } from 'ngx-toastr';
import { ReaderService } from '../reader.service';
import { formatDate } from '@angular/common';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.css']
})
export class BookCopiesComponent implements OnInit {
  @Input() bookId: number;
  bookCopies: BookCopy[] = [];
  bookCopyDetailsForm: FormGroup;
  bookCopyBorrowForm: FormGroup;
  bookCopy: BookCopy;
  readersArray: any[];
  selectedReaderId: string;

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
    private bookCopyService: BookCopyService,
    private readerService: ReaderService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
  ) { }

  ngOnInit() {
    this.getBookCopies();
    this.getReaders();

    this.bookCopyDetailsForm = new FormGroup({
      bookCopyId: new FormControl('', [
      ]),
      copyNumber: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      location: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      description: new FormControl('', [
        //Validators.required,
        //Validators.minLength(5)
      ]),
      bookId: new FormControl('', [
        //Validators.required,
        //Validators.minLength(4)
      ]),
      available: new FormControl('', [
        //Validators.required,
        //Validators.minLength(4)
      ]),
    });

    this.bookCopyBorrowForm = new FormGroup({
      bookCopyId: new FormControl('', [
        //Validators.required
      ]),
      readerId: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      librarianId: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      loanDate: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      plannedDueDate: new FormControl('', [
        Validators.required,
        //Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
      ]),
      
    });
  }

  setBookCopyItemsValue(): void {
    //console.log('setBookCopyValue - bookcopy: ' + this.bookCopy[0].copyNumber);
    this.bookCopyDetailsForm.get('bookCopyId').setValue(this.bookCopy[0].bookCopyId);
    this.bookCopyDetailsForm.get('copyNumber').setValue(this.bookCopy[0].copyNumber);
    this.bookCopyDetailsForm.get('location').setValue(this.bookCopy[0].location);
    this.bookCopyDetailsForm.get('description').setValue(this.bookCopy[0].description);
    this.bookCopyDetailsForm.get('bookId').setValue(this.bookCopy[0].bookId);
    this.bookCopyDetailsForm.get('available').setValue(this.bookCopy[0].available);
    //console.log(this.bookCopyDetailsForm.value);
  }

  getBookCopies(): void {
    this.bookCopyService.getBookCopies(this.bookId)
      .subscribe(resp => {
        this.bookCopies = resp.body;
        console.log(this.bookCopies);
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }

  createBookCopy(): void { 
    this.bookCopyDetailsForm.get('bookId').setValue(this.bookId);
    //console.log('CREATE BOOK COPy: ' + JSON.stringify(this.formGroup.value));
    console.log('createbookcopy');
    this.bookCopyService.createBookCopy(this.bookCopyDetailsForm.value)
      .subscribe(resp => {
        $("#createBookCopyModal").modal('toggle');
        this.toastr.success('Nowy egzemplarz został dodany pomyślnie!');
        this.bookCopyDetailsForm.reset();
        this.getBookCopies();
      }, error => {
        this.toastr.error('Dodawanie egzemplarza nie powiodło się. Spróbuj ponownie.')
    });
  }

  getBookCopy(bookId: number, bookCopyId: number): void {
    this.bookCopyService.getBookCopy(bookId, bookCopyId)
      .subscribe(resp => {
        this.bookCopy = resp.body;
        this.setBookCopyItemsValue();
      }, error => {
        console.log(error);
      });
  }

  updateBookCopy(): void {
    this.bookCopyService.updateBookCopy(this.bookCopyDetailsForm.value)
      .subscribe(resp => {
        $("#editBookCopyModal").modal('toggle');
        this.toastr.success('Zmiany zostały zapisane pomyślnie!');
        this.bookCopyDetailsForm.reset();
        this.getBookCopies();
      }, error => {
        this.toastr.error('Zapisanie zmian nie powiodło się. Spróbuj ponownie.');
      });
  }

  setBorrowDetails(id: number) {
    this.bookCopyBorrowForm.reset();
    this.bookCopyBorrowForm.get('bookCopyId').setValue(id);
    this.bookCopyBorrowForm.get('librarianId').setValue(1);
    this.bookCopyBorrowForm.get('loanDate').setValue(this.calendar.getToday());
    console.log(this.readersArray);
  }

  borrowBookCopy(): void {
    this.prepareBorrowBookCopyForm();
    console.log(this.bookCopyBorrowForm.value);
  }

  prepareBorrowBookCopyForm(): void {
    let loanDateJSON = this.bookCopyBorrowForm.get('loanDate').value;
    let loanDateConverted = loanDateJSON.day + '.' + loanDateJSON.month + "." + loanDateJSON.year;
    console.log(loanDateConverted);
    this.bookCopyBorrowForm.get('loanDate').setValue(loanDateConverted);
    let plannedDueDateJSON = this.bookCopyBorrowForm.get('plannedDueDate').value;
    let plannedDueDateConverted = plannedDueDateJSON.day + '.' + plannedDueDateJSON.month + "." + plannedDueDateJSON.year;
    console.log(plannedDueDateConverted);
    this.bookCopyBorrowForm.get('plannedDueDate').setValue(plannedDueDateConverted);
  }

  getReaders(): void {
    this.readerService.getReaders()
      .subscribe(resp => {
        this.readersArray = resp.body;
        console.log(resp.body);
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }
}
