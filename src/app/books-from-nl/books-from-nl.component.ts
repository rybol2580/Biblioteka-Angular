import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NationalLibraryService } from '../national-library.service';

@Component({
  selector: 'app-books-from-nl',
  templateUrl: './books-from-nl.component.html',
  styleUrls: ['./books-from-nl.component.css']
})
export class BooksFromNLComponent implements OnInit {
  searchFormGroup: FormGroup;
  searchAuthor: string;
  searchTitle: string;
  searchIsbnIssn: string;
  foundBooks: any[];

  constructor(
    private nationalLibraryService: NationalLibraryService,
  ) { }

  ngOnInit() {

    this.searchFormGroup = new FormGroup({
      isbnIssn: new FormControl('', [
      ]),
      author: new FormControl('', [
      ]),
      title: new FormControl('', [
      ]),
    });
  }

  searchBookInNL(): void {
    this.foundBooks = [];
    this.nationalLibraryService.getBooksFromNL(this.searchFormGroup.get('isbnIssn').value, this.searchFormGroup.get('author').value, this.searchFormGroup.get('title').value)
      .subscribe(resp => {
        //console.log('Ksiazki wczytane z BN: ' + JSON.stringify(resp.body));
        this.foundBooks = resp.body;
      }, error => {
        //console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }

}
