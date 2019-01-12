import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceDto} from '../../model/invoice/invoice.dto';
import {ListResponse, SingleResponse} from '../../model/response.model';
import {AppConstants} from '../../../app-constants';


@Injectable({
  providedIn: 'root'
})
export class InvoiceApiService {

  constructor(private http: HttpClient) { }

  getInvoicesByUserId(userId: number): Observable<ListResponse<InvoiceDto>> {
    return this.http.get<ListResponse<InvoiceDto>>(AppConstants.API_ENDPOINT + '/invoices',
      { params: { userId: userId.toString()}});
  }

  getFirst5InvoicesByUserId(userId: number): Observable<ListResponse<InvoiceDto>> {
    return this.http.get<ListResponse<InvoiceDto>>(AppConstants.API_ENDPOINT + '/invoices/recent',
      { params: { userId: userId.toString()}});
  }

  createInvoice(invoice: InvoiceDto): Observable<SingleResponse<InvoiceDto>> {
    return this.http.post<SingleResponse<InvoiceDto>>(AppConstants.API_ENDPOINT + '/invoices', invoice);
  }

  getInvoiceDetailsById(invoiceId: number): Observable<SingleResponse<InvoiceDto>> {
    return this.http.get<SingleResponse<InvoiceDto>>(AppConstants.API_ENDPOINT + '/invoices/invoice',
      { params: { invoiceId: invoiceId.toString() }});
  }

  generateInvoicePdf(invoiceId: number) {
    return this.http.get(AppConstants.API_ENDPOINT + '/invoices/pdf',
      { params: { invoiceId: invoiceId.toString()}, responseType: 'blob'});
  }

  deleteInvoice(invoiceId: number): Observable<SingleResponse<Boolean>> {
    return this.http.delete<SingleResponse<Boolean>>(AppConstants.API_ENDPOINT + '/invoices/delete',
      { params: {invoiceId: invoiceId.toString()}});
  }

  getAllInvoices(): Observable<ListResponse<InvoiceDto>> {
    return this.http.get<ListResponse<InvoiceDto>>(AppConstants.API_ENDPOINT + '/invoices/all');
  }




}

