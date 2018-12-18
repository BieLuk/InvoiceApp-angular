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
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaW' +
            'F0IjoxNTQ1MTMzNzExLCJleHAiOjE1NDU3Mzg1MTF9.3z7B_h4I' +
            'FLTdwS8UK_qPd0bUzfl-FBzJmVLVmWwFVuAVtpPMC7_pElkrLLoM3oOobFLurd5pa_3_nW3wNVbfpQ' // + currentUser.accessToken
        }
      });
    // }

    return next.handle(request);
  }
}
