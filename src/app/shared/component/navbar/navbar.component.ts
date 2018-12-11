import {Component, OnInit} from '@angular/core';
import {AuthApiService} from '../../service/authentication/auth-api.service';
import {Router} from '@angular/router';
import {JwtAuthenticationResponse} from '../../model/response.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  currentUser: JwtAuthenticationResponse;

  constructor(private authService: AuthApiService, private router: Router) {
    // this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
