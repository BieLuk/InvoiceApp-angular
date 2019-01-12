import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthApiService} from '../service/authentication/auth-api.service';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authApiService: AuthApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const currentUser = this.authApiService.currentUserValue;
    // if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTQ3MjEyNzg0LCJleHAiOjE1NDc4MTc1ODR9.' +
            'CXVc_SYQwu7pOvf3ern4YVrPGAaYPBmNiQ42lGcVl2DeU0d7rsD_D7fwKeIBGv1kQuiMThrNUcbOpoik1vzUww' // + currentUser.accessToken
        }
      });
    // }

    return next.handle(request);
  }
}
