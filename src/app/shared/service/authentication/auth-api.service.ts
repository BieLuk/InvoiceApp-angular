import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {AppConstants} from '../../../app-constants';
import {UserLoginDto, UserSignUpDto} from '../../model/user/user-dto';
import {JwtAuthenticationResponse} from '../../model/response.model';


@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private currentUserSubject: BehaviorSubject<JwtAuthenticationResponse>;
  public currentUser: Observable<JwtAuthenticationResponse>;
  public currentUserId: number = undefined;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtAuthenticationResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtAuthenticationResponse {
    return this.currentUserSubject.value;
  }

  signUp(user: UserSignUpDto) {
    return this.http.post(AppConstants.API_ENDPOINT + '/auth/signup', user);
  }

  login(userLoginDto: UserLoginDto) {
    return this.http.post<JwtAuthenticationResponse>(AppConstants.API_ENDPOINT + '/auth/signin', userLoginDto)
      .pipe(map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.accessToken) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.currentUserId = data.userDTO.id;
          this.currentUserSubject.next(data);
        }

        return data;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
