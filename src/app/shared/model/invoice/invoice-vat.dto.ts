import {VatTypeModel} from './vat-type.model';

export interface InvoiceVatDto {
  id: number;
  vatType: VatTypeModel;
  vatValue: number;
  netValue: number;
  grossValue: number;
}
