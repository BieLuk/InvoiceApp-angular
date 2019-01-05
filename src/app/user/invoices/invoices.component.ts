import { Component, OnInit } from '@angular/core';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {InvoiceModel} from '../../shared/model/invoice/invoice.model';
import {InvoiceApiService} from '../../shared/service/invoice/invoice-api.service';
import {InvoiceMapperService} from '../../shared/service/invoice/invoice-mapper.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoiceId: number;
  invoices: InvoiceModel[];
  dtOptions: any = {};

  constructor(private invoiceApiService: InvoiceApiService,
              private invoiceMapperService: InvoiceMapperService,
              private authApiService: AuthApiService,
              private router: Router) { }

  ngOnInit() {
    this.invoiceId = this.authApiService.currentUserId;
    this.loadInvoices();

    this.dtOptions = {
      responsive: {
        details: {
          renderer: function (api, rowId, columns) {
            const data = $.map(columns, function(col, i) {
              return col.hidden ?
                '<tr data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '"> ' +
                '<td style="padding-left: 25px; width: 300px">' + col.title + ':' + '</td> ' +
                '<td style="padding-left: 50px; width: 500px">' + col.data + '</td>' +
                '</tr>' :
                '';
            }).join('');
            return data ?
              $('<table/>').append( data ) :
              false;
          }
        }
      },
      columnDefs: [
        {
          targets: [4],
          orderable: false,
          searchable: false,
        },
      ],
      order: [[0, 'asc']],
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.19/i18n/Polish.json'
      },

    };

  }

  private loadInvoices() {
    this.invoiceApiService.getInvoicesByUserId(1).pipe(
      map(response => response.data),
      map(invoicesDto => invoicesDto
        .map(invoiceDto => this.invoiceMapperService.mapDtoToModel(invoiceDto)))
    ).subscribe(invoices => this.invoices = invoices);
  }

  navigateToInvoiceDetails(invoiceId: number) {
    this.router.navigate(['user', 'invoices', 'details'], {queryParams: { id: invoiceId}});
  }

}
