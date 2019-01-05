import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from '../../shared/model/invoice/invoice.model';
import {map} from 'rxjs/operators';
import {ClientApiService} from '../../shared/service/client/client-api.service';
import {ClientMapperService} from '../../shared/service/client/client-mapper.service';
import {ClientModel} from '../../shared/model/client/client.model';
import {NgbDateParserFormatter, NgbDatepickerI18n, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {PolishDatepickerI18n} from '../../shared/datepicker/PolishDatepickerI18n';
import {PaymentTypeModel} from '../../shared/model/invoice/payment-type.model';
import {PaymentTypeApiService} from '../../shared/service/payment-type/payment-type-api.service';
import {PaymentTypeMapperService} from '../../shared/service/payment-type/payment-type-mapper.service';
import {InvoicePositionModel} from '../../shared/model/invoice/invoice-position.model';
import {VatTypeModel} from '../../shared/model/invoice/vat-type.model';
import {VatTypeApiService} from '../../shared/service/vat-type/vat-type-api.service';
import {VatTypeMapperService} from '../../shared/service/vat-type/vat-type-mapper.service';
import {InvoiceApiService} from '../../shared/service/invoice/invoice-api.service';
import {InvoiceMapperService} from '../../shared/service/invoice/invoice-mapper.service';
import {InvoiceTypeModel} from '../../shared/model/invoice/invoice-type.model';
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
import {PolishDatepickerParserFormatter} from '../../shared/datepicker/PolishDatepickerParserFormatter';


@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: PolishDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: PolishDatepickerParserFormatter}]

})
export class InvoiceNewComponent implements OnInit {

  editInvoiceNumberMode = false;

  invoice = this.initInvoiceModel();

  clients: ClientModel[];
  paymentTypes: PaymentTypeModel[];
  vatTypes: VatTypeModel[];
  invoicePositions: InvoicePositionModel[] = [];

  createDateInvoice: NgbDateStruct;
  saleDateInvoice: NgbDateStruct;
  paymentDateInvoice: NgbDateStruct;

  constructor(private clientApiService: ClientApiService,
              private clientMapperService: ClientMapperService,
              private paymentTypeApiService: PaymentTypeApiService,
              private paymentTypeMapperService: PaymentTypeMapperService,
              private vatTypeApiService: VatTypeApiService,
              private vatTypeMapperService: VatTypeMapperService,
              private invoiceApiService: InvoiceApiService,
              private invoiceMapperService: InvoiceMapperService,
              private authApiService: AuthApiService) { }

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
    ).subscribe(vatTypes => {
      this.vatTypes = vatTypes;
      this.invoicePositions.push(this.initInvoicePositionModel());
    });
  }

  saveInvoice() {
    this.invoice.user = this.authApiService.currentUserValue.userDTO;
    this.invoice.invoicePositions = this.invoicePositions;
    this.invoiceApiService.createInvoice(this.invoiceMapperService.mapModelToDto(this.invoice))
      .subscribe(
        () => {
          console.log(this.invoice);
        }
      );
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

  calculateInvoiceGrossValue() {
    let grossValue = 0;
    this.invoicePositions.forEach(position => grossValue += +position.grossValue);

    return grossValue.toFixed(2);
  }

  calculateInvoiceNetValue() {
    let netValue = 0;
    this.invoicePositions.forEach(position => netValue += +position.netValue);

    return netValue.toFixed(2);
  }

  private initInvoiceTypeModel(): InvoiceTypeModel {
    return {
      id: 1,
      name: 'Faktura'
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
      netValue: 0,
      grossValue: 0,
      paymentType: undefined,
      invoiceType: this.initInvoiceTypeModel(),
      client: undefined,
      invoicePositions: undefined
    };
  }


  private initInvoicePositionModel(): InvoicePositionModel {
    return {
      id: undefined,
      name: undefined,
      unit: undefined,
      quantity: 1,
      netPrice: 0,
      netValue: 0,
      grossValue: 0,
      vatType: this.vatTypes[0],
      vatValue: undefined
    };
  }


  createDateChange(date: NgbDateStruct) {
    this.invoice.createDate = this.format(date);
  }

  saleDateChange(date: NgbDateStruct) {
    this.invoice.saleDate = this.format(date);
  }

  paymentDateChange(date: NgbDateStruct) {
    this.invoice.paymentDate = this.format(date);
  }

  private format(date: NgbDateStruct): string {
    const day = date.day.toString(10);
    const dayNo = day.length === 1 ? `0${day}` : day;
    const month = date.month.toString(10);
    const monthNo = month.length === 1 ? `0${month}` : month;
    return date ?
      `${dayNo}-${monthNo}-${date.year.toString(10)}` : '';
  }

  removeLastInvoicePosition() {
    this.invoicePositions.pop();
  }
}
