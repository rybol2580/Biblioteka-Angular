import { Component, OnInit, Input } from '@angular/core';
import { ReportBookLoan } from '../entities/reportbookloan';
import { ToastrService } from 'ngx-toastr';
import { BookLoanService } from '../book-loan.service';

@Component({
  selector: 'app-reader-returned-loans',
  templateUrl: './reader-returned-loans.component.html',
  styleUrls: ['./reader-returned-loans.component.css']
})
export class ReaderReturnedLoansComponent implements OnInit {
  @Input() readerId: number;
  readerReturnedLoans: ReportBookLoan[] = [];

  constructor(
    private toastr: ToastrService,
    private bookLoanService: BookLoanService,
  ) { }

  ngOnInit() {
    this.getReaderReturnedBooks();
  }

  getReaderReturnedBooks() {
    this.bookLoanService.getReaderReturnedBooks(this.readerId)
      .subscribe(resp => {
        this.readerReturnedLoans = resp.body;
      }, error => {
        //alert(error);
      });
  }

}
