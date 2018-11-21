import { Component, OnInit } from '@angular/core';
import {UserApiService} from '../../shared/service/user/user-api.service';
import {UserModel} from '../../shared/model/user/user.model';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {UserMapperService} from '../../shared/service/user/user-mapper.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-settings-main.component.html',
  styleUrls: ['./user-settings-main.component.css']
})
export class UserSettingsMainComponent implements OnInit {

  userId: number;
  userModel: UserModel;

  constructor(private userApiService: UserApiService, private userMapperSerivce: UserMapperService, private route: ActivatedRoute) {  }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams['id'];
    this.loadUserModel();
  }

  private loadUserModel() {
    this.userApiService.getUserDetailsById(1).pipe(
      map(response => response.data),
      map(userDto => this.userMapperSerivce.mapDtoToModel(userDto))
    )
      .subscribe(user => this.userModel = user);
  }

}
