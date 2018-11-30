import { Component, OnInit } from '@angular/core';
import {UserModel} from '../../shared/model/user/user.model';
import {UserApiService} from '../../shared/service/user/user-api.service';
import {UserMapperService} from '../../shared/service/user/user-mapper.service';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-user-settings-company',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  editUserMode = false;
  editCompanyMode = false;

  userId: number;
  userModel: UserModel;

  constructor(private userApiService: UserApiService, private userMapperSerivce: UserMapperService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams['id']; // TODO tu pobrac dane z sesji
    this.loadUserModel();
  }

  private loadUserModel() {
    this.userApiService.getUserDetailsById(5).pipe(
      map(response => response.data),
      map(userDto => this.userMapperSerivce.mapDtoToModel(userDto))
    ).subscribe(user => this.userModel = user);
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
    this.userApiService.updateUser(this.userMapperSerivce.mapModelToDto(this.userModel))
      .subscribe(
        () => {
          this.editUserMode = false;
          this.editCompanyMode = false;
          this.loadUserModel();
        }
      );
  }



}
