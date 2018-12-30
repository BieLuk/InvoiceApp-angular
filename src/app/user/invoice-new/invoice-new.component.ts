import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from '../../shared/model/invoice/invoice.model';
import {map} from 'rxjs/operators';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';
import {ClientModel} from '../../shared/model/client/client.model';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {PolishDatepickerI18n} from '../../shared/component/datepicker/PolishDatepickerI18n';
import {PaymentTypeModel} from '../../shared/model/invoice/payment-type.model';
import {PaymentTypeApiService} from '../../shared/service/payment-type/payment-type-api.service';
import {PaymentTypeMapperService} from '../../shared/service/payment-type/payment-type-mapper.service';
import {InvoicePositionModel} from '../../shared/model/invoice/invoice-position.model';
import {VatTypeModel} from '../../shared/model/invoice/vat-type.model';
import {VatTypeApiService} from '../../shared/service/vat-type/vat-type-api.service';
import {VatTypeMapperService} from '../../shared/service/vat-type/vat-type-mapper.service';


@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: PolishDatepickerI18n}]

})
export class InvoiceNewComponent implements OnInit {

  editInvoiceNumberMode = false;

  invoice = this.initInvoiceModel();

  clients: ClientModel[];
  paymentTypes: PaymentTypeModel[];
  vatTypes: VatTypeModel[];
  invoicePositions: InvoicePositionModel[] = [this.initInvoicePositionModel()];

  constructor(private clientApiService: ClientApiService,
              private clientMapperService: ClientMapperService,
              private paymentTypeApiService: PaymentTypeApiService,
              private paymentTypeMapperService: PaymentTypeMapperService,
              private vatTypeApiService: VatTypeApiService,
              private vatTypeMapperService: VatTypeMapperService) { }

  ngOnInit() {
    this.loadClients();
    this.loadPaymentTypes();
    this.loadVatTypes();
  }

  changeEditInvoiceNumberMode() {
    this.editInvoiceNumberMode = !this.editInvoiceNumberMode;
  }

  private loadClients() {
    this.clientApiService.getClientsByUserId(1).pipe(
      map(response => response.data),
      map(clientsDto => clientsDto
        .map(clientDto => this.clientMapperService.mapDtoToModel(clientDto)))
    ).subscribe(clients => this.clients = clients);
  }

  private loadPaymentTypes() {
    this.paymentTypeApiService.getAllPaymentTypes().pipe(
      map(response => response.data),
      map(paymentTypesDto => paymentTypesDto
        .map(paymentTypeDto => this.paymentTypeMapperService.mapDtoToModel(paymentTypeDto)))
    ).subscribe(paymentTypes => this.paymentTypes = paymentTypes);
  }

  private loadVatTypes() {
    this.vatTypeApiService.getAllPaymentTypes().pipe(
      map(response => response.data),
      map(vatTypesDto => vatTypesDto
        .map(vatTypeDto => this.vatTypeMapperService.mapDtoToModel(vatTypeDto)))
    ).subscribe(vatTypes => this.vatTypes = vatTypes);
  }

  addInvoicePosition() {
    this.invoicePositions.push(this.initInvoicePositionModel());
    console.log(this.invoicePositions);
    console.log(this.invoice);
  }

  calculateNetValue(quantity: number, netPrice: number) {
    return (netPrice * quantity).toFixed(2);
  }

  calculateNetPrice(netValue: number, quantity: number) {
    return (netValue / quantity).toFixed(2);
  }

  calculateVatAmount(netValue: number, vatValue: number) {
    return (netValue * vatValue).toFixed(2);
  }

  calculateGrossValue(netValue: number, vatAmount: number) {
    return (+netValue + +vatAmount).toFixed(2);
  }

  private initInvoicePositionModel(): InvoicePositionModel {
    return {
      id: undefined,
      invoice: undefined,
      name: undefined,
      unit: undefined,
      quantity: undefined,
      netPrice: undefined,
      netValue: undefined,
      grossValue: undefined,
      vatType: undefined,
      vatValue: undefined
    };
  }

  private initInvoiceModel(): InvoiceModel {
    return {
      id: undefined,
      invoiceNumber: undefined,
      user: undefined,
      createDate: undefined,
      saleDate: undefined,
      paymentDate: undefined,
      netValue: undefined,
      grossValue: undefined,
      paymentType: undefined,
      invoiceType: undefined,
      client: undefined
    };
  }

}
