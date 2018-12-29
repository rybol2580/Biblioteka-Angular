import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookCopy } from '../entities/bookcopy';
import { BookCopyService } from '../book-copy.service';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $ : any;
import { ToastrService } from 'ngx-toastr';
import { ReaderService } from '../reader.service';
import { formatDate } from '@angular/common';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';
import { BookLoanService } from '../book-loan.service';
import { BookLoan } from '../entities/bookloan';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.css']
})
export class BookCopiesComponent implements OnInit {
  @Input() bookId: number;
  //bookCopies: BookCopy[];
  @Output() getBookCopiesAmount = new EventEmitter<number>();
  bookCopies: BookCopy[] = [];
  bookCopyDetailsForm: FormGroup;
  bookCopyBorrowForm: FormGroup;
  bookCopy: BookCopy;
  readersArray: any[];
  selectedReaderId: string;
  bookLoan: BookLoan;

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
    private bookLoanService: BookLoanService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    private location: Location,
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
    //console.log('setBookCopyValue - bookcopy: ' + this.bookCopy.copyNumber);
    this.bookCopyDetailsForm.get('bookCopyId').setValue(this.bookCopy.bookCopyId);
    this.bookCopyDetailsForm.get('copyNumber').setValue(this.bookCopy.copyNumber);
    this.bookCopyDetailsForm.get('location').setValue(this.bookCopy.location);
    this.bookCopyDetailsForm.get('description').setValue(this.bookCopy.description);
    this.bookCopyDetailsForm.get('bookId').setValue(this.bookCopy.bookId);
    this.bookCopyDetailsForm.get('available').setValue(this.bookCopy.available);
    //console.log(this.bookCopyDetailsForm.value);
  }

  getBookCopies(): void {
    this.bookCopyService.getBookCopies(this.bookId)
      .subscribe(resp => {
        this.bookCopies = resp.body;
        this.getBookCopiesAmount.emit(this.bookCopies.length);
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

  getBookCopy(bookCopyId: number): void {
    this.bookCopyService.getBookCopy(bookCopyId)
      .subscribe(resp => {
        console.log(resp.body);
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
        //this.bookCopyDetailsForm.reset();
        this.getBookCopies();
      }, error => {
        this.toastr.error('Zapisanie zmian nie powiodło się. Spróbuj ponownie.');
      });
  }
  
  onDeleteClick(id: number) {
    this.bookCopyService.deleteBookCopy(id)
      .subscribe(resp => {
        $("#editBookCopyModal").modal('toggle');
        this.toastr.success('Egzemplarz został usunięty pomyślnie!');
        this.getBookCopies();
      }, error => {
        this.toastr.error('Usuwanie egzemplarza nie powiodło się. Spróbuj ponownie.');
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

    this.bookLoanService.borrowBook(this.bookLoan)
      .subscribe(resp => {
        $("#borrowBookCopyModal").modal('toggle');
        this.toastr.success('Egzemplarz książki został wypożyczony pomyślnie!');
        this.getBookCopies();
      }, error => {
        this.toastr.error('Wypożyczenie egzemplarza nie powiodło się. Spróbuj ponownie.');
      });
  }

  prepareBorrowBookCopyForm(): void {
    this.bookLoan = this.bookCopyBorrowForm.value;

    let loanDateJSON = this.bookCopyBorrowForm.get('loanDate').value;
    //let loanDateConverted = loanDateJSON.day + '-' + loanDateJSON.month + "-" + loanDateJSON.year;
    let loanDateConverted = loanDateJSON.year + '-' + loanDateJSON.month + "-" + loanDateJSON.day;
    console.log(loanDateConverted);
    //this.bookCopyBorrowForm.get('loanDate').setValue(loanDateConverted);
    this.bookLoan.loanDate = loanDateConverted;
    let plannedDueDateJSON = this.bookCopyBorrowForm.get('plannedDueDate').value;
    let plannedDueDateConverted = plannedDueDateJSON.year + '-' + plannedDueDateJSON.month + "-" + plannedDueDateJSON.day;
    console.log(plannedDueDateConverted);
    //this.bookCopyBorrowForm.get('plannedDueDate').setValue(plannedDueDateConverted);
    this.bookLoan.plannedDueDate = plannedDueDateConverted;
  }

  getReaders(): void {
    this.readerService.getReadersLOV()
      .subscribe(resp => {
        this.readersArray = resp.body;
        console.log(resp.body);
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }

  onAddClick(): void {
    this.bookCopyDetailsForm.reset();
  }
}
