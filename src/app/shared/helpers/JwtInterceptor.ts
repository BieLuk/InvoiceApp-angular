import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthApiService} from '../service/authentication/auth-api.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authApiService: AuthApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // const currentUser = this.authApiService.currentUserValue;
    // if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTQ0' +
            'NjA3NjUwLCJleHAiOjE1NDUyMTI0NTB9.dFzNSPRnx6nt-Ogtc_6yaRQHSGXW' +
            'rusHklqFLZH2Z9wZRK_nfcDvbxX-3lTUl7YmXinobDP3umD75dTdTwZ4GA' // + currentUser.accessToken
        }
      });
    // }

    return next.handle(request);
  }
}
