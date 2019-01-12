import { Component, OnInit } from '@angular/core';
import {UserApiService} from '../../shared/service/user/user-api.service';
import {UserMapperService} from '../../shared/service/user/user-mapper.service';
import {UserSimpleModel} from '../../shared/model/user/user.model';
import {map} from 'rxjs/operators';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  dtOptions: any = {};
  users: UserSimpleModel[];
  currentUserId: number;


  constructor(private userApiService: UserApiService,
              private userMapperService: UserMapperService,
              private authApiService: AuthApiService) { }

  ngOnInit() {
    this.loadUsers();
    this.currentUserId = this.authApiService.currentUserId;

    this.dtOptions = {
      responsive: {
        details: {
          renderer: function (api, rowId, columns) {
            const data = $.map(columns, function(col, i) {
              return col.hidden ?
                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '"> ' +
                '<td style="padding-left: 25px; width: 300px">' + col.title + ':' + '</td> ' +
                '<td style="padding-left: 50px; width: 500px">' + col.data + '</td>' +
                '</tr>' :
                '';
            }).join('');
            return data ?
              $('<table/>').append( data ) :
              false;
          }
        }
      },
      columnDefs: [
        {
          targets: [5],
          orderable: false,
          searchable: false,
        },
      ],
      order: [[0, 'asc']],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Polish.json'
      },

    };

  }

  loadUsers() {
    this.userApiService.getAllUsers().pipe(
      map(response => response.data),
      map(usersDto => usersDto
        .map(userDto => this.userMapperService.mapSimpleDtoToSimpleModel(userDto)))
    ).subscribe(users => this.users = users);
  }

  deleteUser(userId: number) {
    if (userId !== this.currentUserId) {
      this.userApiService.deleteUser(userId).pipe(
        map(response => response.data)
      ).subscribe(
        () => this.loadUsers()
      );
    }
  }

}
