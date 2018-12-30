import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';
import {InvoiceTypeDto} from '../../model/invoice/invoice-type.dto';


@Injectable({
  providedIn: 'root'
})
export class InvoiceTypeApiService {

  constructor(private http: HttpClient) { }

  getInvoiceType(invoiceTypeId: number): Observable<SingleResponse<InvoiceTypeDto>> {
    return this.http.get<SingleResponse<InvoiceTypeDto>>(AppConstants.API_ENDPOINT + '/invoice/type',
      {params: {invoiceTypeId: invoiceTypeId.toString()}});
  }

  getAllInvoiceTypes(): Observable<ListResponse<InvoiceTypeDto>> {
    return this.http.get<ListResponse<InvoiceTypeDto>>(AppConstants.API_ENDPOINT + '/invoice/all');
  }

}

