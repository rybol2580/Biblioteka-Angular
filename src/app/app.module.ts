import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  // gotowe komponenty bootstrap

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReadersReportComponent } from './readers-report/readers-report.component';
import { BooksReportComponent } from './books-report/books-report.component';
import { ReaderDetailsComponent } from './reader-details/reader-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReadersReportComponent,
    BooksReportComponent,
    ReaderDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
