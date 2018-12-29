import { Component, OnInit, Input } from '@angular/core';
import { ReportBookLoan } from '../entities/reportbookloan';
import { ToastrService } from 'ngx-toastr';
import { BookLoanService } from '../book-loan.service';
declare var $ : any;

@Component({
  selector: 'app-reader-loans',
  templateUrl: './reader-loans.component.html',
  styleUrls: ['./reader-loans.component.css']
})
export class ReaderLoansComponent implements OnInit {
  @Input() readerId: number;
  readerLoans: ReportBookLoan[] = [];
  readerReturnedLoans: ReportBookLoan[] = [];

  constructor(
    private toastr: ToastrService,
    private bookLoanService: BookLoanService,
  ) { }

  ngOnInit() {
    this.getReaderBorrowedBooks();
    this.getReaderReturnedBooks();
  }

  getReaderBorrowedBooks() {
    this.bookLoanService.getReaderBorrowedBooks(this.readerId)
      .subscribe(resp => {
        this.readerLoans = resp.body;
      }, error => {
        this.toastr.error('Nie udało się pobrać aktualnych wypożyczeń czytelnika.')
      });
  }

  getReaderReturnedBooks() {
    this.bookLoanService.getReaderReturnedBooks(this.readerId)
      .subscribe(resp => {
        this.readerReturnedLoans = resp.body;
      }, error => {
        this.toastr.error('Nie udało się pobrać historii wypożyczeń czytelnika.')
      });
  }

  returnBookCopy(id: number): void {
    this.bookLoanService.setBookLoanToReturned(id)
      .subscribe(resp => {
        this.toastr.success('Egzemplarz książki został zwrócony pomyślnie!');
        this.getReaderBorrowedBooks();
        this.getReaderReturnedBooks();
      }, error => {
        this.toastr.success('Nie udało się zwrócić egzemplarza książki. Spróbuj ponownie.');
      });
  }
}
