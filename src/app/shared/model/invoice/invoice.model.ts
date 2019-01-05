import {ClientModel} from '../client/client.model';
import {PaymentTypeModel} from './payment-type.model';
import {InvoiceTypeModel} from './invoice-type.model';
import {UserSimpleModel} from '../user/user.model';
import {InvoicePositionModel} from './invoice-position.model';

export interface InvoiceModel {
  id: number;
  invoiceNumber: string;
  user: UserSimpleModel;
  createDate: string;
  saleDate: string;
  paymentDate: string;
  netAmount: number;
  grossAmount: number;
  paymentType: PaymentTypeModel;
  invoiceVersion: InvoiceTypeModel;
  client: ClientModel;
  invoicePositions: InvoicePositionModel[];
}
