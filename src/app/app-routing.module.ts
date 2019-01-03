import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadersReportComponent } from './readers-report/readers-report.component';
import { BooksReportComponent } from './books-report/books-report.component';
import { ReaderDetailsComponent } from './reader-details/reader-details.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksFromNLComponent } from './books-from-nl/books-from-nl.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { LocationComponent } from './location/location.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent},
  { path: 'readers', component: ReadersReportComponent, canActivate: [AuthGuard] },
  { path: 'readers/:id', component: ReaderDetailsComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksReportComponent, canActivate: [AuthGuard] },
  { path: 'books/:id', component: BookDetailsComponent, canActivate: [AuthGuard] },
  { path: 'booksFromNL', component: BooksFromNLComponent, canActivate: [AuthGuard] },
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
  { path: 'location', component: LocationComponent, canActivate: [AuthGuard] }
  //{ path: 'readers', component: ReaderReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
