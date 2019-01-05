
import {Injectable} from '@angular/core';
import {InvoicePositionDto} from '../../model/invoice/invoice-position.dto';
import {InvoicePositionModel} from '../../model/invoice/invoice-position.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicePositionMapperService {
  constructor() {
  }

  mapDtoToModel(dto: InvoicePositionDto): InvoicePositionModel {
    return {
      id: dto.id,
      name: dto.name,
      unit: dto.unit,
      quantity: dto.quantity,
      netPrice: dto.netPrice,
      netValue: dto.netValue,
      grossValue: dto.grossValue,
      vatType: dto.vatType,
      vatValue: dto.vatValue
    };
  }

  mapModelToDto(model: InvoicePositionModel): InvoicePositionDto {
    return {
      id: model.id,
      name: model.name,
      unit: model.unit,
      quantity: model.quantity,
      netPrice: model.netPrice,
      netValue: model.netValue,
      grossValue: model.grossValue,
      vatType: model.vatType,
      vatValue: model.vatValue
    };
  }

}
