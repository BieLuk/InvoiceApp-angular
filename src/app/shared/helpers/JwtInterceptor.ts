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
          Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNTQ2NTUwNzIxLCJleHAiOjE1NDcxNTU1MjF9.' +
            'DxIf2hClxnbjIdtWMBbjdA2mz6AqPsPD8AqSzO_yK-v4O1daCUiNymZuGGdigT_PTWb9_fFUZDH7RjtIISVLzA' // + currentUser.accessToken
        }
      });
    // }

    return next.handle(request);
  }
}
