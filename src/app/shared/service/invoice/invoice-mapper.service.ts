
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
      netValue: dto.netValue,
      grossValue: dto.grossValue,
      paymentType: dto.paymentType,
      invoiceType: dto.invoiceType,
      client: dto.client,
      invoicePositions: dto.invoicePositions
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
      netValue: model.netValue,
      grossValue: model.grossValue,
      paymentType: model.paymentType,
      invoiceType: model.invoiceType,
      client: model.client,
      invoicePositions: model.invoicePositions

    };
  }

}
