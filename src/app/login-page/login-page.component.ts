import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ErrorMessage } from 'ng-bootstrap-form-validation';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFormGroup: FormGroup;
  returnUrl: string;

  customErrorMessages: ErrorMessage[] = [
    {
      error: 'required',
      format: (label, error) => `Zawartość pola "${label}" nie może być pusta!`
    }
  ];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
  ) { 
    // redirect to books if already logged in
    if (this.authenticationService.currentLibrarianValue) { 
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      username: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ]),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    let username = this.loginFormGroup.controls.username.value;
    let password = this.loginFormGroup.controls.password.value;
    this.authenticationService.login(username, password)
      .pipe(first())
        .subscribe(
          data => {
            this.toastr.success("Zalogowano pomyślnie");
            this.router.navigate([this.returnUrl]);
          },
          error => {
            this.toastr.error("Niepoprawna nazwa bibliotekarza lub hasło");
          });
  }

}
