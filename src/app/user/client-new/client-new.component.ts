import { Component, OnInit } from '@angular/core';
import {InvoiceDataApiService} from '../../shared/service/invoice-data/invoice-data-api.service';
import {InvoiceDataMapperService} from '../../shared/service/invoice-data/invoice-data-mapper.service';
import {ClientModel} from '../../shared/model/client/client.model';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs/operators';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';

@Component({
  selector: 'app-client-new',
  templateUrl: './client-new.component.html',
  styleUrls: ['./client-new.component.css']
})
export class ClientNewComponent implements OnInit {

  userId: number;
  client = this.initClientModel();
  searchNip: string;

  constructor(private invoiceDataApiService: InvoiceDataApiService, private invoiceDataMapperService: InvoiceDataMapperService,
              private clientApiService: ClientApiService, private clientMapperService: ClientMapperService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.route.snapshot.queryParams['id']; // TODO pobrac dane z sesji
  }

  private loadInvoiceData(nip) {
    this.invoiceDataApiService.getClientFromApiByNip(nip).pipe(
      map(response => response.data),
      map(invoiceDataDto => this.invoiceDataMapperService.mapInvoiceDataDtoToClientModel(invoiceDataDto))
    ).subscribe(client => this.client = client);
  }

  saveClient() {
    // this.client.user TODO dodac zalogowanego usera
    this.clientApiService.createClient(this.clientMapperService.mapModelToDto(this.client))
      .subscribe(
        () => {
          console.log('ZAPISANO'); // TODO toastr o zapisaniu
        }
      );

  }

  private initClientModel(): ClientModel {
    return {
      id: undefined,
      name: undefined,
      email: undefined,
      website: undefined,
      phone: undefined,
      street: undefined,
      postcode: undefined,
      city: undefined,
      nip: undefined,
      comment: undefined,
      user: undefined
    };
  }



}
