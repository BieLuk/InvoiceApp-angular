import {VatTypeModel} from './vat-type.model';

export interface InvoiceVatModel {
  id: number;
  vatType: VatTypeModel;
  vatValue: number;
  netValue: number;
  grossValue: number;
}
