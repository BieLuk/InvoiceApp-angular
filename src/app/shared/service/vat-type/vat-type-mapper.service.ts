
import {Injectable} from '@angular/core';
import {VatTypeDto} from '../../model/invoice/vat-type.dto';
import {VatTypeModel} from '../../model/invoice/vat-type.model';

@Injectable({
  providedIn: 'root'
})
export class VatTypeMapperService {
  constructor() {
  }

  mapDtoToModel(dto: VatTypeDto): VatTypeModel {
    return {
      id: dto.id,
      name: dto.name,
      value: dto.value
    };
  }

  mapModelToDto(model: VatTypeModel): VatTypeDto {
    return {
      id: model.id,
      name: model.name,
      value: model.value
    };
  }

}
