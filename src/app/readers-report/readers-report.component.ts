import { Component, OnInit } from '@angular/core';
import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-readers-report',
  templateUrl: './readers-report.component.html',
  styleUrls: ['./readers-report.component.css']
})
export class ReadersReportComponent implements OnInit {
  readers: Reader[] = [];
  reader: Reader = {
    readerId: 200,
    cardNumber: 'asd',
    firstName: 'asd',
    lastName: 'asd',
    pesel: 'asd',
    birthday: '2018-01-01',
    phone: 'asd',
    email: 'asd',
    city: 'asd',
    street: 'asd',
    streetNumber: 'asd',
    flatNumber: 'asd'
  };

  constructor(private readerService: ReaderService) { }

  ngOnInit() {
    this.getReaders();
  }

  getReaders(): void {
    this.readerService.getReaders()
      .subscribe(readers => this.readers = readers);
  }

  save(): void {
    this.readerService.updateReader(this.reader)
      .subscribe();
  }
}
