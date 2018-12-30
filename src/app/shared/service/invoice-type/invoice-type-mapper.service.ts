
import {Injectable} from '@angular/core';
import {InvoiceTypeDto} from '../../model/invoice/invoice-type.dto';
import {InvoiceTypeModel} from '../../model/invoice/invoice-type.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceTypeMapperService {
  constructor() {
  }

  mapDtoToModel(dto: InvoiceTypeDto): InvoiceTypeModel {
    return {
      id: dto.id,
      name: dto.name
    };
  }

  mapModelToDto(model: InvoiceTypeModel): InvoiceTypeDto {
    return {
      id: model.id,
      name: model.name
    };
  }

}
