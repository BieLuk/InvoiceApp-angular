import {UserSimpleDto} from '../user/user-dto';
import {ClientDto} from '../client/client-dto';
import {PaymentTypeDto} from './payment-type.dto';
import {InvoiceTypeDto} from './invoice-type.dto';

export interface InvoiceModel {
  id: number;
  invoiceNumber: string;
  user: UserSimpleDto;
  createDate: string;
  saleDate: string;
  paymentDate: string;
  netValue: number;
  grossValue: number;
  paymentType: PaymentTypeDto;
  invoiceType: InvoiceTypeDto;
  client: ClientDto;
}
