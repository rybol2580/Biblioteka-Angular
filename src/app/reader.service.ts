import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Reader } from './entities/reader';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  private readersUrl = "http://localhost:8080/api/readers";

  constructor(
    private http: HttpClient) { }

  /** Get readers from server */
  getReaders(): Observable<HttpResponse<Reader[]>> {
    return this.http.get<Reader[]>(this.readersUrl, { observe: 'response' });
  }

  /** Get readers from server */
  getReader(id: number): Observable<HttpResponse<Reader>> {
    console.log(`id w getReader: ${ id }`)
    const url = `${this.readersUrl}/${id}`;

    return this.http.get<Reader>(url, { observe: 'response' });
  }

  /*getReader(id: number): Observable<Reader> {
    console.log(`id w getReader: ${id}`)
    const url = `${this.readersUrl}/${id}`;

    return this.http.get<Reader>(url);
  }*/



  /** Update the reader on the server */
  updateReader(reader: Reader): Observable<any> {
    return this.http.put(this.readersUrl, reader, httpOptions).pipe(
      catchError(this.handleError<any>('updateReader'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log('wystapil blad');
      return of(result as T);
    };
  }
}
