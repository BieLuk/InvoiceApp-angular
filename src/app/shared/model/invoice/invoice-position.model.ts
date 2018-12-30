
import {InvoiceModel} from './invoice.model';
import {VatTypeModel} from './vat-type.model';

export interface InvoicePositionModel {
  id: number;
  invoice: InvoiceModel;
  name: string;
  unit: string;
  quantity: number;
  netPrice: number;
  netValue: number;
  grossValue: number;
  vatType: VatTypeModel;
  vatValue: number;
}
