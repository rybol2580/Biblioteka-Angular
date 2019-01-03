import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Reader } from '../_models/reader';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
  ) { }

  getTop10Readers(): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/api/statistics/TopReaders_V";

    return this.http.get<any>(url,
                                    {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'})
  }

  getLoansByGenre(): Observable<HttpResponse<any>> {
    const url = "http://localhost:8080/api/graphs/BookLoansByGenre_V";

    return this.http.get<any>(url,
                                    {headers: new HttpHeaders({'Content-Type':'application/json'}), observe: 'response'})
  }
}
