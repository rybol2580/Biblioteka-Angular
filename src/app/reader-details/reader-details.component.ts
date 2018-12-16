import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Reader } from '../entities/reader';
import { ReaderService } from '../reader.service';

@Component({
  selector: 'app-reader-details',
  templateUrl: './reader-details.component.html',
  styleUrls: ['./reader-details.component.css']
})
export class ReaderDetailsComponent implements OnInit {
  @Input() reader: Reader;
  headers: any;
  status: any;

  constructor(
    private route: ActivatedRoute,
    private readerService: ReaderService
  ) { }

  ngOnInit() {
    this.getReader();
  }

  getReader(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    /*this.readerService.getReader(id)
      .subscribe(reader => this.reader = reader);*/
    this.readerService.getReader(id)
      .subscribe(resp => {
        this.reader = resp.body;
        if (resp.status > 300) {
          console.log('blaad jest');
        } else {
          this.status = resp.status;
        }
      }, error => {
        console.log('test');
        console.log(error);
      });
  }

  save(): void {
    this.readerService.updateReader(this.reader)
      .subscribe();
  }

}
