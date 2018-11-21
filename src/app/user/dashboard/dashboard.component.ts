import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from './model/invoice.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  invoices: InvoiceModel[] = [
    {
      number: '18/11/234',
      client: 'DAREX Dariusz Bieńkowski',
      date:  '11.11.2018',
      type: 'Faktura',
      value: '132,44'
    },
    {
      number: '18/11/074',
      client: 'Microsoft',
      date:  '06.11.2018',
      type: 'Faktura korygująca',
      value: '254,01'
    },
    {
      number: '18/11/065',
      client: 'Microsoft',
      date:  '04.11.2018',
      type: 'Faktura',
      value: '268,77'
    },
    {
      number: '18/11/148',
      client: 'ABC XYZ',
      date:  '09.11.2018',
      type: 'Faktura',
      value: '66,60'
    }
  ];





  // dtOptions: DataTables.Settings = {};

  ngOnInit() {
    // console.log(this.invoices);
    // this.dtOptions = {
    //   ajax: this.invoices,
    //   columns: [
    //     {
    //       title: 'Numer faktury',
    //       data: 'number'
    //     },
    //     {
    //       title: 'Nazwa klienta',
    //       data: 'client'
    //     },
    //     {
    //       title: 'Data wystawienia',
    //       data: 'date'
    //     },
    //     {
    //       title: 'Rodzaj dokumentu',
    //       data: 'type'
    //     },
    //     {
    //       title: 'Wartość brutto',
    //       data: 'value'
    //     }
    //   ]
    // };


  }

}
