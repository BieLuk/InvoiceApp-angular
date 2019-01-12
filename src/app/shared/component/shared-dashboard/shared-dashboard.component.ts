import { Component, OnInit } from '@angular/core';
import {AuthApiService} from '../../service/authentication/auth-api.service';

@Component({
  selector: 'app-shared-component',
  templateUrl: './shared-dashboard.component.html',
  styleUrls: ['./shared-dashboard.component.css']
})
export class SharedDashboardComponent implements OnInit {

  constructor(private authApiService: AuthApiService) { }

  ngOnInit() {
  }

  getUserRole() {
    return this.authApiService.currentUserRole;
  }

}
