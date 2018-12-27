import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BookCopy } from './entities/bookcopy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookCopyService {
  private bookCopiesUrl = "http://localhost:8080/api/book-copies";
 
  constructor(
    private http: HttpClient
    ) {}

  /** Get book copies from server */
  getBookCopies(id: number): Observable<HttpResponse<BookCopy[]>> {
    const url = `${this.bookCopiesUrl}/${id}`;
    
    return this.http.get<BookCopy[]>(url, { observe: 'response' });
  }

  /** Get particular book copy from server */
  getBookCopy(id: number): Observable<HttpResponse<BookCopy>> {
    const url = `${this.bookCopiesUrl}/${id}`;

    return this.http.get<BookCopy>(url, { observe: 'response' });
  }

  /** Insert book copy on the server */
  createBookCopy(bookCopy: BookCopy): Observable<HttpResponse<BookCopy>> {
    return this.http.post<BookCopy>(this.bookCopiesUrl, bookCopy, { observe: 'response' });
  }

  /** Update the book copy on the server */
  updateBookCopy(bookCopy: BookCopy): Observable<HttpResponse<BookCopy>> {
    return this.http.put<BookCopy>(
                                  this.bookCopiesUrl, 
                                  bookCopy, 
                                  {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'});
  }

  deleteBookCopy(bookCopy: BookCopy): Observable<HttpResponse<BookCopy>> {
    const url = `${this.bookCopiesUrl}/${bookCopy.bookId}`;

    return this.http.delete<BookCopy>(url,
                                    {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'})
  }
}
