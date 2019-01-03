import { Component, OnInit } from '@angular/core';
import { Librarian } from './_models/librarian';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';
declare var $ : any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Biblioteka';
  currentLibrarian: Librarian;
  
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
    this.authenticationService.currentLibrarian.subscribe(x => this.currentLibrarian = x);
  }

  ngOnInit(): void {}

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
