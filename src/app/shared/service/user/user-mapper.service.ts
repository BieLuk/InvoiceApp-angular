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
      email: dto.email,
      phone: dto.phone,
      street: dto.street,
      postcode: dto.postcode,
      city: dto.city,
      nip: dto.nip,
      regon: dto.regon,
      active: dto.active
    };
  }
}
