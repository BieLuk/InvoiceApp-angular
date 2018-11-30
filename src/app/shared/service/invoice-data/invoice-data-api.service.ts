import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';
import {InvoiceDataDto} from '../../model/invoice-data/invoice-data.dto';

@Injectable({
  providedIn: 'root'
})
export class InvoiceDataApiService {

  constructor(private http: HttpClient) { }

  getClientFromApiByNip(nip: number): Observable<SingleResponse<InvoiceDataDto>> {
    return this.http.get<SingleResponse<InvoiceDataDto>>(AppConstants.API_ENDPOINT + '/clients/nip', { params: { nip: nip.toString() }});
  }



}
