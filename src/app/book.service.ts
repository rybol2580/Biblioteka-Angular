import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './entities/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksUrl = "http://localhost:8080/api/books";
 
  // Observable string streams


  constructor(
    private http: HttpClient
    ) {}

  /** Get books from server */
  getBooks(): Observable<HttpResponse<Book[]>> {
    return this.http.get<Book[]>(this.booksUrl, { observe: 'response' });
  }

  /** Get particular book from server */
  getBook(id: number): Observable<HttpResponse<Book>> {
    const url = `${this.booksUrl}/${id}`;

    return this.http.get<Book>(url, { observe: 'response' });
  }

  /** Insert book on the server */
  createBook(book: Book): Observable<HttpResponse<Book>> {
    return this.http.post<Book>(this.booksUrl, book, { observe: 'response' });
  }

  /** Update the book on the server */
  updateBook(book: Book): Observable<HttpResponse<Book>> {
    return this.http.put<Book>(
                                  this.booksUrl, 
                                  book, 
                                  {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'});
  }

  deleteBook(book: Book): Observable<HttpResponse<Book>> {
    const url = `${this.booksUrl}/${book.bookId}`;

    return this.http.delete<Book>(url,
                                    {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'})
  }
}
