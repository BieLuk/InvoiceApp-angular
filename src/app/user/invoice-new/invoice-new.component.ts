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
import {InvoiceVatModel} from '../../shared/model/invoice/invoice-vat.model';


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
  invoiceVats: InvoiceVatModel[] = [];

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

  saveInvoice() {
    this.invoice.user = this.authApiService.currentUserValue.userDTO;
    this.invoice.invoicePositions = this.invoicePositions;
    this.invoice.invoiceVats = this.invoiceVats;
    this.invoiceApiService.createInvoice(this.invoiceMapperService.mapModelToDto(this.invoice))
      .subscribe(
        () => {
          // TODO toastr, navigate
        }
      );
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

  addInvoicePosition() {
    this.invoicePositions.push(this.initInvoicePositionModel());
  }

  removeLastInvoicePosition() {
    this.invoicePositions.pop();
    this.calculateInvoiceVat();
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

  calculateInvoiceGrossAmount() {
    let grossValue = 0;
    this.invoicePositions.forEach(position => grossValue += +position.grossValue);

    return grossValue.toFixed(2);
  }

  calculateInvoiceNetAmount() {
    let netValue = 0;
    this.invoicePositions.forEach(position => netValue += +position.netValue);

    return netValue.toFixed(2);
  }

  calculateInvoiceVatAmount() {
    let vatValue = 0;
    this.invoicePositions.forEach(position => vatValue += +position.vatValue);

    return vatValue.toFixed(2);
  }

  calculateInvoiceVat() {
    let vatTypeFounded: boolean;
    this.invoiceVats = [];

    for (const position of this.invoicePositions) {
      vatTypeFounded = false;
      if (this.invoiceVats.length !== 0) {
        for (const vat of this.invoiceVats) {
          if (vat.vatType === position.vatType) {
            vat.netValue = Number((+vat.netValue + +position.netValue).toFixed(2));
            vat.vatValue = Number((+vat.vatValue + +position.vatValue).toFixed(2));
            vat.grossValue = Number((+vat.grossValue + +position.grossValue).toFixed(2));
            vatTypeFounded = true;
            break;
          }
        }
        if (vatTypeFounded !== true) {
          const invoiceVatElem: InvoiceVatModel = this.initInvoiceVatModel();
          invoiceVatElem.netValue = position.netValue;
          invoiceVatElem.vatType = position.vatType;
          invoiceVatElem.grossValue = position.grossValue;
          invoiceVatElem.vatValue = position.vatValue;
          this.invoiceVats.push(invoiceVatElem);
        }
      } else {
        const invoiceVatElem: InvoiceVatModel = this.initInvoiceVatModel();
        invoiceVatElem.netValue = position.netValue;
        invoiceVatElem.vatType = position.vatType;
        invoiceVatElem.grossValue = position.grossValue;
        invoiceVatElem.vatValue = position.vatValue;
        this.invoiceVats.push(invoiceVatElem);
      }
    }
  }

  private initVatTypeModel(): VatTypeModel {
    return {
      id: 1,
      name: '23%',
      value: 0.23
    };
  }

  private initInvoiceVatModel(): InvoiceVatModel {
    return {
      id: undefined,
      vatValue: 0,
      vatType: this.initVatTypeModel(),
      netValue: 0,
      grossValue: 0
    };
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
      netAmount: 0,
      grossAmount: 0,
      vatAmount: 0,
      paymentType: undefined,
      invoiceVersion: this.initInvoiceTypeModel(),
      client: undefined,
      invoicePositions: undefined,
      invoiceVats: undefined
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


}
