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
  public currentUserRole: string = undefined;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<JwtAuthenticationResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
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
        if (data && data.accessToken) {
          localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
          this.currentUserId = data.userDTO.id;
          this.currentUserRole = data.userDTO.roles[0].name;
          localStorage.setItem('currentUserId', JSON.stringify(this.currentUserId));
          this.currentUserSubject.next(data);
        }

        return data;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserId');
    this.currentUserSubject.next(null);
  }
}
