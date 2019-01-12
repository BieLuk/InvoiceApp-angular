import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {UserDto, UserSignUpDto, UserSimpleDto} from '../../model/user/user-dto';
import {AppConstants} from '../../../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getUserDetailsById(userId: number): Observable<SingleResponse<UserDto>> {
    return this.http.get<SingleResponse<UserDto>>(AppConstants.API_ENDPOINT + '/user', { params: { userId: userId.toString() }});
  }

  updateUser(user: UserDto): Observable<SingleResponse<UserDto>> {
    return this.http.put<SingleResponse<UserDto>>(AppConstants.API_ENDPOINT + '/user', user);
  }

  getAllUsers(): Observable<ListResponse<UserSimpleDto>> {
    return this.http.get<ListResponse<UserSimpleDto>>(AppConstants.API_ENDPOINT + '/user/all');
  }

  deleteUser(userId: number): Observable<SingleResponse<Boolean>> {
    return this.http.delete<SingleResponse<Boolean>>(AppConstants.API_ENDPOINT + '/user/delete',
      { params: { userId: userId.toString()}});
  }








}
