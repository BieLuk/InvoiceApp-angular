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
import {AuthApiService} from '../../shared/service/authentication/auth-api.service';
import {PolishDatepickerParserFormatter} from '../../shared/datepicker/PolishDatepickerParserFormatter';
import {InvoiceVatModel} from '../../shared/model/invoice/invoice-vat.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-invoice-edit',
  templateUrl: './invoice-edit.component.html',
  styleUrls: ['./invoice-edit.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: PolishDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: PolishDatepickerParserFormatter}]

})
export class InvoiceEditComponent implements OnInit {

  editInvoiceNumberMode = false;
  userId: number;
  invoiceId: number;

  invoice: InvoiceModel;

  clients: ClientModel[];
  paymentTypes: PaymentTypeModel[];
  vatTypes: VatTypeModel[];
  invoicePositions: InvoicePositionModel[] = [];
  invoiceVats: InvoiceVatModel[] = [];

  parser = new PolishDatepickerParserFormatter;

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
              private authApiService: AuthApiService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.userId = this.authApiService.currentUserId;
    this.invoiceId = this.route.snapshot.queryParams['id'];
    this.loadInvoice();
  }

  changeEditInvoiceNumberMode() {
    this.editInvoiceNumberMode = !this.editInvoiceNumberMode;
  }

  saveInvoice() {
    this.invoice.invoicePositions = this.invoicePositions;
    this.invoice.invoiceVats = this.invoiceVats;
    this.invoiceApiService.updateInvoice(this.invoiceMapperService.mapModelToDto(this.invoice))
      .subscribe(
        () => {
          this.router.navigate(['user', 'invoice', 'details'], { queryParams: { id: this.invoiceId }});
          this.toastr.success('Faktura została zaktualizowana', 'Sukces');
        },
        () => this.toastr.error('Wystąpił błąd przy zapisie faktury', 'Błąd')
      );
  }

  private loadInvoice() {
    this.invoiceApiService.getInvoiceDetailsById(this.invoiceId).pipe(
      map(response => response.data),
      map(invoiceDto => this.invoiceMapperService.mapDtoToModel(invoiceDto))
    ).subscribe(invoice => {
      this.invoice = invoice;
      this.invoicePositions = invoice.invoicePositions;
      this.invoiceVats = invoice.invoiceVats;
      this.createDateInvoice = this.parser.parse(invoice.createDate);
      this.saleDateInvoice = this.parser.parse(invoice.saleDate);
      this.paymentDateInvoice = this.parser.parse(invoice.paymentDate);

      this.loadClients();
      this.loadPaymentTypes();
      this.loadVatTypes();
    });
  }

  private loadClients() {
    this.clientApiService.getClientsByUserId(1).pipe(
      map(response => response.data),
      map(clientsDto => clientsDto
        .map(clientDto => this.clientMapperService.mapDtoToModel(clientDto)))
    ).subscribe(clients => {
      this.clients = clients;
      this.invoice.client = this.clients.find(client => client.id === this.invoice.client.id);
      }
    );
  }

  private loadPaymentTypes() {
    this.paymentTypeApiService.getAllPaymentTypes().pipe(
      map(response => response.data),
      map(paymentTypesDto => paymentTypesDto
        .map(paymentTypeDto => this.paymentTypeMapperService.mapDtoToModel(paymentTypeDto)))
    ).subscribe(paymentTypes => {
      this.paymentTypes = paymentTypes;
      this.invoice.paymentType = this.paymentTypes.find(paymentType => paymentType.id === this.invoice.paymentType.id);
    });
  }

  private loadVatTypes() {
    this.vatTypeApiService.getAllPaymentTypes().pipe(
      map(response => response.data),
      map(vatTypesDto => vatTypesDto
        .map(vatTypeDto => this.vatTypeMapperService.mapDtoToModel(vatTypeDto)))
    ).subscribe(vatTypes => {
      this.vatTypes = vatTypes;
      // this.invoicePositions.push(this.initInvoicePositionModel());

      this.invoice.invoicePositions.forEach(position => {
        position.vatType = this.vatTypes.find(vatType => vatType.id === position.vatType.id);
      });

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
    this.invoice.createDate = this.parser.format(date);
  }

  saleDateChange(date: NgbDateStruct) {
    this.invoice.saleDate = this.parser.format(date);
  }

  paymentDateChange(date: NgbDateStruct) {
    this.invoice.paymentDate = this.parser.format(date);
  }

  navigateToInvoiceDetails() {
    this.router.navigate(['user', 'invoices', 'details'], { queryParams: { id: this.invoiceId }});
  }

  isSaveDisabled(): boolean {
    let disabled = false;
    if (this.invoice.invoiceNumber.length > 0 &&
      this.invoice.createDate.length > 0 &&
      this.invoice.saleDate.length > 0 &&
      this.invoice.paymentDate.length > 0 &&
      this.invoice.netAmount.toString().length > 0 &&
      this.invoice.grossAmount.toString().length > 0 &&
      this.invoice.vatAmount.toString().length > 0 &&
      this.invoice.paymentType.name.length > 0 &&
      this.invoice.client.name.length > 0) {
      this.invoicePositions.forEach(position => {
        if ( position.name.length < 1 ||
          position.quantity.toString().length < 1 ||
          position.netPrice.toString().length < 1 ||
          position.netValue.toString().length < 1 ||
          position.grossValue.toString().length < 1 ||
          position.vatType.name.length < 1 ||
          position.vatValue.toString().length < 1) {

          disabled = true;
        }
      });
    } else {
      disabled = true;
    }

    return disabled;
  }

}
