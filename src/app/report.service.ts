import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(
    private http: HttpClient
  ) { }

  public getPDF(): Observable<HttpResponse<Blob>> {   
      let url = 'http://localhost:8080/api/reports';
      return this.http.get(url, { responseType: 'blob', observe: 'response' });
    }
}
