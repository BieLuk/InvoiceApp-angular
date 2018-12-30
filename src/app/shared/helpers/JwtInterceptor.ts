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
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTQ1OTk3MzE5LCJleHAiOjE1NDY2MDIxMTl9.' +
            'S_7veZ380k7LqZb_8oJsezF7PtRd30LofuhXynuFi-RelcKirZoQwI7fwNwZUlEv6Nm4QgFYF6SURuU_-f0dkg' // + currentUser.accessToken
        }
      });
    // }

    return next.handle(request);
  }
}
