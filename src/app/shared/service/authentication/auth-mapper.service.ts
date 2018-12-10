import {Injectable} from '@angular/core';
import {UserDto, UserLoginDto} from '../../model/user/user-dto';
import {UserLoginModel, UserModel} from '../../model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthMapperService {
  constructor() {}

  mapDtoToModel(dto: UserLoginDto): UserLoginModel {
    return {
      id: dto.id,
      usernameOrEmail: dto.usernameOrEmail,
      password: dto.password,
      token: dto.token
    };
  }

  mapModelToDto(model: UserLoginModel): UserLoginDto {
    return {
      id: model.id,
      usernameOrEmail: model.usernameOrEmail,
      password: model.password,
      token: model.token
    };
  }

}
