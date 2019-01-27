import {Component, OnInit} from '@angular/core';
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
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-invoice-new',
  templateUrl: './invoice-new.component.html',
  styleUrls: ['./invoice-new.component.css'],
  providers: [{provide: NgbDatepickerI18n, useClass: PolishDatepickerI18n},
    {provide: NgbDateParserFormatter, useClass: PolishDatepickerParserFormatter}]

})
export class InvoiceNewComponent implements OnInit {

  editInvoiceNumberMode = false;
  userId: number;

  invoice = this.initInvoiceModel();
  invoices: InvoiceModel[];

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
              private toastr: ToastrService) { }

  ngOnInit() {
    this.userId = this.authApiService.currentUserId;
    this.calculateInvoiceNumber();
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
          this.router.navigate(['user', 'invoices']);
          this.toastr.success('Faktura została zapisana', 'Sukces');
        },
        () => this.toastr.error('Wystąpił błąd przy zapisie faktury', 'Błąd')
  );
  }

  private loadClients() {
    this.clientApiService.getClientsByUserId(this.userId).pipe(
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
            this.calculateInvoicePosition(vat, position);
            vatTypeFounded = true;
            break;
          }
        }
        if (vatTypeFounded !== true) {
          const invoiceVatElem = this.setInvoicePosition(position);
          this.invoiceVats.push(invoiceVatElem);
        }
      } else {
        const invoiceVatElem = this.setInvoicePosition(position);
        this.invoiceVats.push(invoiceVatElem);
      }
    }
  }

  private calculateInvoicePosition(vat: InvoiceVatModel, position: InvoicePositionModel) {
    vat.netValue = Number((+vat.netValue + +position.netValue).toFixed(2));
    vat.vatValue = Number((+vat.vatValue + +position.vatValue).toFixed(2));
    vat.grossValue = Number((+vat.grossValue + +position.grossValue).toFixed(2));
  }

  private setInvoicePosition(position: InvoicePositionModel) {
    const invoiceVatElem: InvoiceVatModel = this.initInvoiceVatModel();
    invoiceVatElem.netValue = position.netValue;
    invoiceVatElem.vatType = position.vatType;
    invoiceVatElem.grossValue = position.grossValue;
    invoiceVatElem.vatValue = position.vatValue;
    return invoiceVatElem;
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
      invoiceNumber: '',
      user: undefined,
      createDate: '',
      saleDate: '',
      paymentDate: '',
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
      name: '',
      unit: '',
      quantity: 1,
      netPrice: 0,
      netValue: 0,
      grossValue: 0,
      vatType: this.vatTypes[0],
      vatValue: 0
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

  calculateInvoiceNumber(): void {
    const currentDate = new Date();
    let currentMonth: string;
    if (currentDate.getMonth() < 9) {
      currentMonth = '0' + (currentDate.getMonth() + 1).toString();
    } else {
      currentMonth = (currentDate.getMonth() + 1).toString();
    }
    const currentYear =  currentDate.getFullYear().toString();
    let invoiceNo = 0;
    this.invoiceApiService.getInvoicesByUserId(this.userId).pipe(
      map(response => response.data),
      map(invoicesDto => invoicesDto
        .map(invoiceDto => this.invoiceMapperService.mapDtoToModel(invoiceDto)))
    ).subscribe(invoices => {
      this.invoices = invoices;
      this.invoices.forEach(invoice => {
        const invoiceMonth = invoice.createDate.substr(3, 2);
        const invoiceYear = invoice.createDate.substr(6, 4);
       if (invoiceMonth === currentMonth && invoiceYear === currentYear) {
         invoiceNo++;
       }
      });
      if (invoiceNo !== 0) {
        this.invoice.invoiceNumber = (invoiceNo + 1).toString() + '/' + currentMonth + '/' + currentYear;
      } else {
        this.invoice.invoiceNumber = '1/' + currentMonth + '/' + currentYear;
      }
    });
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
