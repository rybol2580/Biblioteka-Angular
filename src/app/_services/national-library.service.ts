import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Reader } from '../_models/reader';
import { Book } from '../_models/book';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type':'application/json'}),
  observe: 'response'
};

@Injectable({
  providedIn: 'root'
})
export class NationalLibraryService {
  private booksFromNLUrl = "http://localhost:8080/api/books/bn?";

  constructor(
    private http: HttpClient
  ) { }

  /** Get books from National Library */
  getBooksFromNL(isbnIssn: string, author: string, title: string): Observable<HttpResponse<Book[]>> {
    let urlEnd = '';
    let tempBooksFromNLUrl = this.booksFromNLUrl;
    
    if (isbnIssn) {
      urlEnd = urlEnd + 'isbnIssn=' + isbnIssn + '&';
      console.log('isbnIssn: ' + isbnIssn);
    }
    if (title) {
      urlEnd = urlEnd + 'title=' + title + '&';
      console.log('title: ' + title);
    }
    if (author) {
      urlEnd = urlEnd + 'author=' + author + '&';
      console.log('title: ' + author);
    }

    tempBooksFromNLUrl = tempBooksFromNLUrl + urlEnd;
    console.log('URL: ' + tempBooksFromNLUrl);

    return this.http.get<Book[]>(tempBooksFromNLUrl, { observe: 'response' });
  }
}
