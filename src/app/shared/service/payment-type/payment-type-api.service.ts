import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';
import {PaymentTypeDto} from '../../model/invoice/payment-type.dto';


@Injectable({
  providedIn: 'root'
})
export class PaymentTypeApiService {

  constructor(private http: HttpClient) { }

  getPaymentType(paymentTypeId: number): Observable<SingleResponse<PaymentTypeDto>> {
    return this.http.get<SingleResponse<PaymentTypeDto>>(AppConstants.API_ENDPOINT + '/payment',
      {params: {paymentTypeId: paymentTypeId.toString()}});
  }

  getAllPaymentTypes(): Observable<ListResponse<PaymentTypeDto>> {
    return this.http.get<ListResponse<PaymentTypeDto>>(AppConstants.API_ENDPOINT + '/payment/all');
  }

}

