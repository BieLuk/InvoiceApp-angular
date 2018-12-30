import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';
import {VatTypeDto} from '../../model/invoice/vat-type.dto';


@Injectable({
  providedIn: 'root'
})
export class VatTypeApiService {

  constructor(private http: HttpClient) { }

  getVatType(vatTypeId: number): Observable<SingleResponse<VatTypeDto>> {
    return this.http.get<SingleResponse<VatTypeDto>>(AppConstants.API_ENDPOINT + '/vat',
      {params: {vatTypeId: vatTypeId.toString()}});
  }

  getAllPaymentTypes(): Observable<ListResponse<VatTypeDto>> {
    return this.http.get<ListResponse<VatTypeDto>>(AppConstants.API_ENDPOINT + '/vat/all');
  }

}

