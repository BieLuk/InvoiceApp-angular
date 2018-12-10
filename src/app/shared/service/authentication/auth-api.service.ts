import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {UserLoginModel, UserSimpleModel} from '../../model/user/user.model';
import {AppConstants} from '../../../app-constants';
import {UserLoginDto} from '../../model/user/user-dto';
import {JwtAuthenticationResponse} from '../../model/response.model';


@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private currentUserSubject: BehaviorSubject<JwtAuthenticationResponse>;
  public currentUser: Observable<JwtAuthenticationResponse>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtAuthenticationResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtAuthenticationResponse {
    return this.currentUserSubject.value;
  }

  login(userLoginDto: UserLoginDto) {
    return this.http.post<JwtAuthenticationResponse>(AppConstants.API_ENDPOINT + '/auth/signin', userLoginDto)
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.currentUserSubject.next(user);
        }

        return user.userDto;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
