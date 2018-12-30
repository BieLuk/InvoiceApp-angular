
import {Injectable} from '@angular/core';
import {PaymentTypeDto} from '../../model/invoice/payment-type.dto';
import {PaymentTypeModel} from '../../model/invoice/payment-type.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentTypeMapperService {
  constructor() {
  }

  mapDtoToModel(dto: PaymentTypeDto): PaymentTypeModel {
    return {
      id: dto.id,
      name: dto.name
    };
  }

  mapModelToDto(model: PaymentTypeModel): PaymentTypeDto {
    return {
      id: model.id,
      name: model.name
    };
  }

}
