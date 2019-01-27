import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {AuthApiService} from '../../service/authentication/auth-api.service';
import {AlertApiService} from '../../service/alert/alert-api.service';
import {UserLoginModel} from '../../model/user/user.model';
import {first} from 'rxjs/operators';
import {AuthMapperService} from '../../service/authentication/auth-mapper.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm')
  loginForm: NgForm;

  loading = false;
  returnUrl: string;
  userLoginModel = this.initUserLoginModel();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthApiService,
    private alertService: AlertApiService,
    private authMapperService: AuthMapperService,
    private toastr: ToastrService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['']);
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit() {
    this.loading = true;
    this.authenticationService.login(this.authMapperService.mapLoginModelToLoginDto(this.userLoginModel))
      .pipe(first())
      .subscribe(
        () => {
          this.router.navigate([this.returnUrl]);
        },
        () => {
          this.toastr.error('Podano niepoprawne dane', 'Błąd logowania');
          this.loading = false;
        });
  }

  isSaveDisabled(): boolean {
    return this.loginForm.form.invalid;
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
