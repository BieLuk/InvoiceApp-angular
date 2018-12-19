import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthApiService} from '../../service/authentication/auth-api.service';
import {UserApiService} from '../../service/user/user-api.service';
import {AlertApiService} from '../../service/alert/alert-api.service';
import {first} from 'rxjs/operators';
import {UserSignUpModel} from '../../model/user/user.model';
import {UserMapperService} from '../../service/user/user-mapper.service';
import {AuthMapperService} from '../../service/authentication/auth-mapper.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loading = false;
  submitted = false;
  userSignUpModel = this.initUserSignUpModel();
  repeatPassword: string;

  constructor(
    private router: Router,
    private authApiService: AuthApiService,
    private userApiService: UserApiService,
    private authMapperService: AuthMapperService,
    private alertService: AlertApiService
  ) {
    // redirect to home if already logged in
    if (this.authApiService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   username: ['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }

  // convenience getter for easy access to form fields
  // get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // if (this.registerForm.invalid) {
    //   return;
    // }
    // TODO WALIDACJA

    if (this.userSignUpModel.password === this.repeatPassword) {

      this.loading = true;
      this.authApiService.signUp(this.authMapperService.mapSignUpModelToSignUpDto(this.userSignUpModel))
        .pipe(first())
        .subscribe(
          data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.loading = false;
          });
    } else {
      console.log('hasła są różne');
    }
  }

  initUserSignUpModel(): UserSignUpModel {
    return {
      name: undefined,
      username: undefined,
      email: undefined,
      password: undefined
    };
  }
}
