import { Component, OnInit, Input } from '@angular/core';
import { ReportBookLoan } from '../entities/reportbookloan';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reader-loans',
  templateUrl: './reader-loans.component.html',
  styleUrls: ['./reader-loans.component.css']
})
export class ReaderLoansComponent implements OnInit {
  @Input() readerId: number;
  readerLoans: ReportBookLoan[] = [
    {
      bookLoanId: 2,
      copyNumber: '123',
      title: 'title',
      loanDate: 'asd',
      plannedDueDate: 'asd',
      actualDueDate: 'asd',
      status: 'BORROWED'
    }
  ];

  constructor(
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
  }

  returnBookCopy(): void {
    this.readerLoans[0].status = 'RETURNED';
    this.toastr.success('Egzemplarz książki został zwrócony pomyślnie!');
  }

}
