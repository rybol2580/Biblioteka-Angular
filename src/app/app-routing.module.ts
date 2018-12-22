import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadersReportComponent } from './readers-report/readers-report.component';
import { BooksReportComponent } from './books-report/books-report.component';
import { ReaderDetailsComponent } from './reader-details/reader-details.component';
import { AddReaderModalComponent } from './add-reader-modal/add-reader-modal.component';

const routes: Routes = [
  { path: '', redirectTo: '/readers', pathMatch: 'full' },
  { path: 'readers', component: ReadersReportComponent },
  { path: 'readers/:id', component: ReaderDetailsComponent },
  { path: 'books', component: BooksReportComponent }
  //{ path: 'readers', component: ReaderReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
