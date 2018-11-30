import {Injectable} from '@angular/core';
import {ClientModel} from '../../model/client/client.model';
import {ClientDto} from '../../model/client/client-dto';

@Injectable({
  providedIn: 'root'
})
export class ClientMapperService {
  constructor() {}

  mapDtoToModel(dto: ClientDto): ClientModel {
    return {
      id: dto.id,
      name: dto.name,
      email: dto.email,
      website: dto.website,
      phone: dto.phone,
      street: dto.street,
      postcode: dto.postcode,
      city: dto.city,
      nip: dto.nip,
      comment: dto.comment,
      user: dto.user
    };
  }
  //
  // mapModelToDto(model: ClientModel): ClientDto {
  //   return {
  //     id: model.id,
  //     name: model.name,
  //     email: model.email,
  //     website: model.website,
  //     phone: model.phone,
  //     street: model.street,
  //     postcode: model.postcode,
  //     city: model.city,
  //     nip: model.nip,
  //     comment: model.comment,
  //     user: model.user
  //   };
  // }




}
