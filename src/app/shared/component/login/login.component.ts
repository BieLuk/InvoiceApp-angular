import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthApiService} from '../../service/authentication/auth-api.service';
import {AlertApiService} from '../../service/alert/alert-api.service';
import {UserLoginModel} from '../../model/user/user.model';
import {first} from 'rxjs/operators';
import {AuthMapperService} from '../../service/authentication/auth-mapper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  returnUrl: string;
  userLoginModel = this.initUserLoginModel();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthApiService,
    private alertService: AlertApiService,
    private authMapperService: AuthMapperService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid

    this.loading = true;
    this.authenticationService.login(this.authMapperService.mapModelToDto(this.userLoginModel))
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log('error:' + error);
          this.alertService.error(error);
          this.loading = false;
        });
  }



  private initUserLoginModel(): UserLoginModel {
    return {
      id: undefined,
      usernameOrEmail: undefined,
      password: undefined,
      token: undefined
    };
  }
}
