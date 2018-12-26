import { Component, OnInit, Input } from '@angular/core';
import { BookCopy } from '../entities/bookcopy';
import { BookCopyService } from '../book-copy.service';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $ : any;
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-copies',
  templateUrl: './book-copies.component.html',
  styleUrls: ['./book-copies.component.css']
})
export class BookCopiesComponent implements OnInit {
  @Input() bookId: number;
  bookCopies: BookCopy[];
  bookCopyDetailsForm: FormGroup;
  bookCopyBorrowForm: FormGroup;
  bookCopy: BookCopy;

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
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getBookCopies();

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
    });

    this.bookCopyBorrowForm = new FormGroup({
      bookCopyId: new FormControl('', [
        //Validators.required
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
    });
  }

  setBookCopyItemsValue(): void {
    this.bookCopyDetailsForm.get('bookCopyId').setValue(this.bookCopy.bookCopyId);
    this.bookCopyDetailsForm.get('copyNumber').setValue(this.bookCopy.copyNumber);
    this.bookCopyDetailsForm.get('location').setValue(this.bookCopy.location);
    this.bookCopyDetailsForm.get('description').setValue(this.bookCopy.description);
    this.bookCopyDetailsForm.get('bookId').setValue(this.bookCopy.bookId);
    this.bookCopyDetailsForm.get('isAvailable').setValue(this.bookCopy.isAvailable);
  }

  getBookCopies(): void {
    this.bookCopyService.getBookCopies()
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

  getBookCopy(id: number): void {
    this.bookCopyService.getBookCopy(id)
      .subscribe(resp => {
        //console.log(resp.body);
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

  setBorrowDetails(id: number, copyNumber: string) {
    this.bookCopyBorrowForm.get('bookCopyId').setValue(id);
    this.bookCopyBorrowForm.get('copyNumber').setValue(copyNumber);
    //this.bookCopy.copyNumber = copyNumber;

    console.log(id + ' oraz copy number ' + copyNumber);
  }
}
