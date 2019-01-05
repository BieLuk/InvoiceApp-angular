
import {VatTypeDto} from './vat-type.dto';

export interface InvoicePositionDto {
  id: number;
  name: string;
  unit: string;
  quantity: number;
  netPrice: number;
  netValue: number;
  grossValue: number;
  vatType: VatTypeDto;
  vatValue: number;
}
