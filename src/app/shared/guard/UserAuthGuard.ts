import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthApiService} from '../service/authentication/auth-api.service';

@Injectable({ providedIn: 'root' })
export class UserAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authApiService: AuthApiService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authApiService.currentUserValue;
    if (currentUser && currentUser.userDTO && currentUser.userDTO.roles[0].name === 'ROLE_USER') {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
