import {Component, OnInit} from '@angular/core';
import {AuthApiService} from '../../service/authentication/auth-api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthApiService, private router: Router) {
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isUserLoggedIn() {
    return localStorage.getItem('currentUserId');
  }

  getUserRole() {
    return this.authService.currentUserRole;
  }



}
