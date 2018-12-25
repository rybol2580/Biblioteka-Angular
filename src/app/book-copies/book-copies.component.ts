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
    private bookCopyService: BookCopyService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getBookCopies();

    this.formGroup = new FormGroup({
      // bookCopyId: new FormControl('', [
      //   Validators.required
      // ]),
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

  getBookCopies(): void {
    this.bookCopyService.getBookCopies()
      .subscribe(resp => {
        this.bookCopies = resp.body;
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }

  createBookCopy(): void { 
    this.formGroup.get('bookId').setValue(this.bookId);
    console.log('CREATE BOOK COPy: ' + JSON.stringify(this.formGroup.value));
    this.bookCopyService.createBookCopy(this.formGroup.value)
      .subscribe(resp => {
        $("#createBookCopyModal").modal('toggle');
        this.toastr.success('Nowy egzemplarz został dodany pomyślnie!');
        this.getBookCopies();
      }, error => {
        this.toastr.error('Dodawanie egzemplarza nie powiodło się. Spróbuj ponownie.')
    });
  }

  // waitForBookId() {
  //   if(this.bookId == null){
  //     console.log(this.bookId);
  //     setTimeout(this.waitForBookId, 5000);
  //   }
  //   else {
  //     this.bookService.getSelectedBookId$.subscribe((data) => {
  //       console.log("DATA BOOKCOPY " + data);
  //       this.bookId = data;
  //       }
  //     );
  //     console.log('BOOK COPY -> BOOK ID: ' + this.bookId);
  //   }
  // }

}
