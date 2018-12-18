import { Component, OnInit } from '@angular/core';
import {UserModel, UserSimpleModel} from '../../shared/model/user/user.model';
import {UserApiService} from '../../shared/service/user/user-api.service';
import {UserMapperService} from '../../shared/service/user/user-mapper.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
import {AuthMapperService} from '../../shared/service/authentication/auth-mapper.service';

@Component({
  selector: 'app-user-settings-company',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  editUserMode = false;
  editCompanyMode = false;

  userId: number;
  clientModel: UserModel;

  constructor(private userApiService: UserApiService,
              private userMapperService: UserMapperService,
              private authApiService: AuthApiService) {
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

  changeEditCompanyMode() {
    this.editCompanyMode = !this.editCompanyMode;
  }

  // TODO rozdzielic zmiane hasla od reszty
  // TODO rozdzielić zapisywanie danych do bazy na oddzielne moduły

  saveChanges() {
    this.userApiService.updateUser(this.userMapperService.mapModelToDto(this.clientModel))
      .subscribe(
        () => {
          this.editUserMode = false;
          this.editCompanyMode = false;
          this.loadUserModel();
        }
      );
  }



}
