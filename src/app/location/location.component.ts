import { Component, OnInit } from '@angular/core';
declare var $ : any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  title: string = 'Biblioteka';
  lat: number = 52.252989;
  lng: number = 20.8954792;
  zoom: number = 16;

  constructor() { }

  ngOnInit() {
    $(document).ready(function() {
      var navLink = $('.nav-link')[3];
      $('.nav-link').each(function(this) {
        $(this).removeClass('active');
      });
      $(navLink).addClass('active');
    });
  }

}
