import {Injectable} from '@angular/core';
import {UserDto} from '../../model/user/user-dto';
import {UserModel} from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserMapperService {
  constructor() {}

  mapDtoToModel(dto: UserDto): UserModel {
    return {
      id: dto.id,
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
      street: dto.street,
      postcode: dto.postcode,
      city: dto.city,
      nip: dto.nip,
      regon: dto.regon,
      active: dto.active
    };
  }

  mapModelToDto(model: UserModel): UserDto {
    return {
      id: model.id,
      name: model.name,
      username: model.username,
      email: model.email,
      password: model.password,
      phone: model.phone,
      street: model.street,
      postcode: model.postcode,
      city: model.city,
      nip: model.nip,
      regon: model.regon,
      active: model.active
    };
  }



}
