import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BookLoan } from './entities/bookloan';
import { Observable } from 'rxjs';
import { ReportBookLoan } from './entities/reportbookloan';

@Injectable({
  providedIn: 'root'
})
export class BookLoanService {
  private bookLoansUrl = "http://localhost:8080/api/book-loans";

  constructor(
    private http: HttpClient
    ) {}

  borrowBook(bookCopyLoan: BookLoan): Observable<HttpResponse<BookLoan>> {
    return this.http.post<BookLoan>(this.bookLoansUrl, 
                                    bookCopyLoan, { observe: 'response' });
  }

  getReaderBorrowedBooks(id: number): Observable<HttpResponse<ReportBookLoan[]>> {
    let borrowedUrl = `${this.bookLoansUrl}/${id}/borrowed`;

    return this.http.get<ReportBookLoan[]>(borrowedUrl, { observe: 'response' });
  }

  getReaderReturnedBooks(id: number): Observable<HttpResponse<ReportBookLoan[]>> {
    let borrowedUrl = `${this.bookLoansUrl}/${id}/returned`;

    return this.http.get<ReportBookLoan[]>(borrowedUrl, { observe: 'response' });
  }

  setBookLoanToReturned(id: number): Observable<HttpResponse<any>> {
    let returnBookCopyUrl = `${this.bookLoansUrl}/${id}`;

    return this.http.put<any>(returnBookCopyUrl, { observe: 'response' });
  }
}
