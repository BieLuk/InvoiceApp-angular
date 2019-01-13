import { Component, OnInit } from '@angular/core';
import {map} from 'rxjs/operators';
import {InvoiceApiService} from '../../shared/service/invoice/invoice-api.service';
import {InvoiceMapperService} from '../../shared/service/invoice/invoice-mapper.service';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
import {Router} from '@angular/router';
import {InvoiceModel} from '../../shared/model/invoice/invoice.model';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: [ './user-dashboard.component.css' ]
})
export class UserDashboardComponent implements OnInit {

  userId: number;
  invoices: InvoiceModel[];

  constructor(private invoiceApiService: InvoiceApiService,
              private invoiceMapperService: InvoiceMapperService,
              private authApiService: AuthApiService,
              private router: Router) { }

  ngOnInit() {
    this.userId = this.authApiService.currentUserId;
    this.loadFirst5Invoices();

  }

  private loadFirst5Invoices() {
    this.invoiceApiService.getFirst5InvoicesByUserId(this.userId).pipe(
      map(response => response.data),
      map(invoicesDto => invoicesDto
        .map(invoiceDto => this.invoiceMapperService.mapDtoToModel(invoiceDto)))
    ).subscribe(invoices => this.invoices = invoices);
  }

  navigateToInvoiceDetails(invoiceId: number) {
    this.router.navigate(['user', 'invoices', 'details'], {queryParams: { id: invoiceId}});
  }

}
