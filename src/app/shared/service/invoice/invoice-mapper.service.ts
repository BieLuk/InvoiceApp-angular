
import {Injectable} from '@angular/core';
import {InvoiceDto} from '../../model/invoice/invoice.dto';
import {InvoiceModel} from '../../model/invoice/invoice.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class InvoiceMapperService {
  constructor() {
  }

  mapDtoToModel(dto: InvoiceDto): InvoiceModel {
    return {
      id: dto.id,
      invoiceNumber: dto.invoiceNumber,
      user: dto.user,
      createDate: dto.createDate,
      saleDate: dto.saleDate,
      paymentDate: dto.paymentDate,
      netAmount: dto.netAmount,
      grossAmount: dto.grossAmount,
      vatAmount: dto.vatAmount,
      paymentType: dto.paymentType,
      invoiceVersion: dto.invoiceVersion,
      client: dto.client,
      invoicePositions: dto.invoicePositions,
      invoiceVats: dto.invoiceVats
    };
  }

  mapModelToDto(model: InvoiceModel): InvoiceDto {
    return {
      id: model.id,
      invoiceNumber: model.invoiceNumber,
      user: model.user,
      createDate: model.createDate,
      saleDate: model.saleDate,
      paymentDate: model.paymentDate,
      netAmount: model.netAmount,
      grossAmount: model.grossAmount,
      vatAmount: model.vatAmount,
      paymentType: model.paymentType,
      invoiceVersion: model.invoiceVersion,
      client: model.client,
      invoicePositions: model.invoicePositions,
      invoiceVats: model.invoiceVats
    };
  }

}
