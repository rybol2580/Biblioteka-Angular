import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  // gotowe komponenty bootstrap
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReadersReportComponent } from './readers-report/readers-report.component';
import { BooksReportComponent } from './books-report/books-report.component';
import { ReaderDetailsComponent } from './reader-details/reader-details.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookCopiesComponent } from './book-copies/book-copies.component';
import { BooksFromNLComponent } from './books-from-nl/books-from-nl.component';
import { ReaderLoansComponent } from './reader-loans/reader-loans.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ReaderReturnedLoansComponent } from './reader-returned-loans/reader-returned-loans.component';
import { AgmCoreModule } from '@agm/core';
import { LocationComponent } from './location/location.component';
import { JWTInterceptor } from './_interceptors/jwt-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    ReadersReportComponent,
    BooksReportComponent,
    ReaderDetailsComponent,
    LoadingSpinnerComponent,
    BookDetailsComponent,
    BookCopiesComponent,
    BooksFromNLComponent,
    ReaderLoansComponent,
    StatisticsComponent,
    ReaderReturnedLoansComponent,
    LocationComponent
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
    NgBootstrapFormValidationModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    NgSelectModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      
    })
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: JWTInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
