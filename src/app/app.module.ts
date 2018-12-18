import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  // gotowe komponenty bootstrap
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReadersReportComponent } from './readers-report/readers-report.component';
import { BooksReportComponent } from './books-report/books-report.component';
import { ReaderDetailsComponent } from './reader-details/reader-details.component';
import { TestWalidacjiComponent } from './test-walidacji/test-walidacji.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReadersReportComponent,
    BooksReportComponent,
    ReaderDetailsComponent,
    TestWalidacjiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    NgBootstrapFormValidationModule.forRoot(),
    NgBootstrapFormValidationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
