import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.message a').click(function () {
      $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });
  }

  testuje() {
    console.log('test');
  }

}
