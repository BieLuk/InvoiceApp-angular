import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel, UserSimpleModel} from '../../shared/model/user/user.model';
import {UserApiService} from '../../shared/service/user/user-api.service';
import {UserMapperService} from '../../shared/service/user/user-mapper.service';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
import {AuthMapperService} from '../../shared/service/authentication/auth-mapper.service';
import {ToastrService} from 'ngx-toastr';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-user-settings-company',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  @ViewChild('userForm')
  userForm: NgForm;

  editUserMode = false;

  userId: number;
  clientModel: UserModel;

  constructor(private userApiService: UserApiService,
              private userMapperService: UserMapperService,
              private authApiService: AuthApiService,
              private router: Router,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.userId = this.authApiService.currentUserId;
    this.loadUserModel();
  }

  private loadUserModel() {
    this.userApiService.getUserDetailsById(this.userId).pipe(
      map(response => response.data),
      map(userDto => this.userMapperService.mapDtoToModel(userDto))
    ).subscribe(user => this.clientModel = user);
  }

  changeEditUserMode() {
    this.editUserMode = !this.editUserMode;
  }


  saveChanges() {
    this.userApiService.updateUser(this.userMapperService.mapModelToDto(this.clientModel))
      .subscribe(
        () => {
          this.editUserMode = false;
          this.loadUserModel();
          this.toastr.success('Uzytkownik został zapisany', 'Sukces');
        }
      );
  }

  isSaveDisabled(): boolean {
    return this.userForm.form.invalid;
  }



}
