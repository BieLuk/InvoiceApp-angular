import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {AuthApiService} from '../../service/authentication/auth-api.service';
import {UserApiService} from '../../service/user/user-api.service';
import {AlertApiService} from '../../service/alert/alert-api.service';
import {first} from 'rxjs/operators';
import {UserSignUpModel} from '../../model/user/user.model';
import {UserMapperService} from '../../service/user/user-mapper.service';
import {AuthMapperService} from '../../service/authentication/auth-mapper.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('registerForm')
  registerForm: NgForm;

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
    if (this.authApiService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;

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

  isSaveDisabled(): boolean {
    return this.registerForm.form.invalid;
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
