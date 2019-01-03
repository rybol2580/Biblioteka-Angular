import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Librarian } from '../_models/librarian';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentLibrarianSubject: BehaviorSubject<Librarian>;
  public currentLibrarian: Observable<Librarian>;

  constructor(private http: HttpClient) {
      this.currentLibrarianSubject = new BehaviorSubject<Librarian>(JSON.parse(localStorage.getItem('currentLibrarian')));
      this.currentLibrarian = this.currentLibrarianSubject.asObservable();
  }

  public get currentLibrarianValue(): Librarian {
      return this.currentLibrarianSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>('http://localhost:8080/api/login', { username, password })
        .pipe(map(librarian => {
            // login successful if there's a jwt token in the response
            if (librarian && librarian.token) {
                // store details details and jwt token in local storage to keep details logged in between page refreshes
                localStorage.setItem('currentLibrarian', JSON.stringify(librarian));
                //console.log(JSON.stringify(Librarian));
                this.currentLibrarianSubject.next(librarian);
            }

            return librarian;
        }));
  }

  logout() {
    // remove librarian from local storage to log librarian out
    localStorage.removeItem('currentLibrarian');
    this.currentLibrarianSubject.next(null);
  }
}
