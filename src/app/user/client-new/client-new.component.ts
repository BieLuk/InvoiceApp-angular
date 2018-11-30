import { Component, OnInit } from '@angular/core';
import {InvoiceDataApiService} from '../../shared/service/invoice-data/invoice-data-api.service';
import {InvoiceDataMapperService} from '../../shared/service/invoice-data/invoice-data-mapper.service';
import {ClientModel} from '../../shared/model/client/client.model';
import {InvoiceDataModel} from '../../shared/model/invoice-data/invoice-data.model';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  userId: number;
  invoiceDataModel: InvoiceDataModel;
  client: ClientModel;
  searchNip: string;

  clientForm = new FormGroup({
    name: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    postcode: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    nip: new FormControl('', Validators.required),
    phone: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl(''),
    comment: new FormControl('')
    });

  constructor(private invoiceDataApiService: InvoiceDataApiService, private invoiceDataMapperService: InvoiceDataMapperService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams['id']; // TODO pobrac dane z sesji
  }

  private loadInvoiceData(nip) {
    this.invoiceDataApiService.getClientFromApiByNip(nip).pipe(
      map(response => response.data),
      map(invoiceDataDto => this.invoiceDataMapperService.mapDtoToModel(invoiceDataDto))
    ).subscribe(invoiceData => this.invoiceDataModel = invoiceData);
  }

  saveClient() {
    this.client = this.clientForm.value;
    console.log(this.clientForm.value);
  }

}
