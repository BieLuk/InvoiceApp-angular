import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceDto} from '../../model/invoice/invoice.dto';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';
import {InvoicePositionDto} from '../../model/invoice/invoice-position.dto';


@Injectable({
  providedIn: 'root'
})
export class InvoicePositionApiService {

  constructor(private http: HttpClient) { }

  getInvoicePositionsByInvoiceId(invoiceId: number): Observable<ListResponse<InvoicePositionDto>> {
    return this.http.get<ListResponse<InvoicePositionDto>>(AppConstants.API_ENDPOINT + '/invoice/position',
      { params: { invoiceId: invoiceId.toString()}});
  }

  createInvoicePosition(invoicePosition: InvoicePositionDto): Observable<SingleResponse<InvoicePositionDto>> {
    return this.http.post<SingleResponse<InvoicePositionDto>>(AppConstants.API_ENDPOINT + '/invoice/position', invoicePosition);
  }

}

