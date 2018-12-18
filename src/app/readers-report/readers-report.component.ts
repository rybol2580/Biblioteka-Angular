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
  readers: Reader[];


  

  constructor(private readerService: ReaderService) { }

  ngOnInit() {
    this.getReaders();
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    /*(function() {
      'use strict';
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        console.log(forms);
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            console.log('submit');
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    })();*/
  }

  // getReaders(): void {
  //   this.readerService.getReaders()
  //     .subscribe(readers => this.readers = readers);
  // }

  getReaders(): void {
    this.readerService.getReaders()
      .subscribe(resp => {
        this.readers = resp.body;
      }, error => {
        //alert('blad!');
        console.log($("#connection-refused-err").show());
        console.log(error);
      });
  }
}
