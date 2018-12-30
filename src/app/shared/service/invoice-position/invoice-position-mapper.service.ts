
import {Injectable} from '@angular/core';
import {InvoiceDto} from '../../model/invoice/invoice.dto';
import {InvoiceModel} from '../../model/invoice/invoice.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class InvoicePositionMapperService {
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
      client: dto.client
    };
  }

  mapModelToDto(model: InvoiceModel): InvoiceDto {
    return {
      id: model.id,
      invoiceNumber: model.invoiceNumber,
      user: model.user,
      createDate: model.createDate.toString(),
      saleDate: model.saleDate.toString(),
      paymentDate: model.paymentDate.toString(),
      netValue: model.netValue,
      grossValue: model.grossValue,
      paymentType: model.paymentType,
      invoiceType: model.invoiceType,
      client: model.client
    };
  }

  toNgbDateStruct(stringDate: string) {
    // const stringDateYear = stringDate.substr(0, 4);
    // const stringDate = stringDate.substr(0, 4);
    //
    // const date: NgbDateStruct = {
    //   day = stringDate.sub
    // }

  }
}
