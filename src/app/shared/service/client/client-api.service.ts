import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';
import {ClientDto} from '../../model/client/client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientApiService {

  constructor(private http: HttpClient) { }

  getClientsByUserId(userId: number): Observable<ListResponse<ClientDto>> {
    return this.http.get<ListResponse<ClientDto>>(AppConstants.API_ENDPOINT + '/clients', { params: { userId: userId.toString()}});
  }


  createClient(client: ClientDto): Observable<SingleResponse<ClientDto>> {
    return this.http.post<SingleResponse<ClientDto>>(AppConstants.API_ENDPOINT + '/clients', client);
  }


  //
  // getUserDetailsById(userId: number): Observable<SingleResponse<UserDto>> {
  //   return this.http.get<SingleResponse<UserDto>>(AppConstants.API_ENDPOINT + '/user', { params: { userId: userId.toString() }});
  // }
  //
  // updateUser(user: UserDto): Observable<SingleResponse<UserDto>> {
  //   return this.http.put<SingleResponse<UserDto>>(AppConstants.API_ENDPOINT + '/user', user);
  // }



}
